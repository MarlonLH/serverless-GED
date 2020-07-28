const Responses = require('../common/API_Response')
const DynamoDB = require('../common/DynamoDB')

const tableName = process.env.tableName

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

const getDocumentByUUID = async () => {

}

const postDocument = async () => {

}

module.exports.handler = async (event) => {
  const { httpMethod, pathParameters } = event

  if (httpMethod === 'GET') {
    if (pathParameters && pathParameters.uuid && typeof pathParameters === 'string') {
      return getDocumentByUUID(pathParameters)
    }
    return getAllDocuments()
  } else if (httpMethod === 'POST') {
    return postDocument()
  }

  return Responses._400({ failed: true, message: 'Unhandled request' })
}