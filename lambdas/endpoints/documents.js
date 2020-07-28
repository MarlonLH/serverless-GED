const Responses = require('../common/API_Response')
const DynamoDB = require('../common/DynamoDB')
const S3 = require('../common/S3')

const tableName = process.env.tableName
const bucketName = process.env.bucketName

const getAllDocuments = async () => {
  const documents = await DynamoDB.scan(tableName).catch((error) => {
    console.log('Error in DynamoDB scan', error)
    return ({ failed: true, error })
  })

  if (!documents || documents.failed) {
    return Responses._400({ message: 'Failed to get documents.', error: documents && documents.error })
  }
  
  return Responses._200({ success: true, documents })
}

const getDocumentByUUID = async (UUID) => {
  const document = await DynamoDB.get(UUID, tableName).catch((error) => {
    console.log('Error in DynamoDB scan', error)
    return ({ failed: true, error })
  })

  if (!document || document.failed) {
    return Responses._400({ message: 'Failed to get document.', error: document && document.error })
  }
  
  return Responses._200({ success: true, document })
}

const postDocument = async () => {
  const documentInfos = await S3.getPresignedURL(bucketName).catch((error) => {
    console.log('Error in S3 getPresignedURL')
    return ({ failed: true, error })
  })

  if (!documentInfos || documentInfos.failed) {
    return Responses._400({ message: 'Failed to get presigned url for new document.', error: documentInfos && documentInfos.error })
  }

  const status = await DynamoDB.write(documentInfos, tableName).catch((error) => {
    console.log('Error in DynamoDB write')
    return ({ failed: true, error })
  })

  if (!status || status.failed) {
    return Responses._400({ message: 'Failed to write new document.', status })
  }

  return Responses._200({ success: true, documentInfos })
}

module.exports.handler = async (event) => {
  const { httpMethod, pathParameters } = event

  if (httpMethod === 'GET') {
    if (pathParameters && pathParameters.uuid && typeof pathParameters.uuid === 'string') {
      return getDocumentByUUID(pathParameters.uuid)
    }
    return getAllDocuments()
  } else if (httpMethod === 'POST') {
    return postDocument()
  }

  return Responses._400({ failed: true, message: 'Unhandled request' })
}