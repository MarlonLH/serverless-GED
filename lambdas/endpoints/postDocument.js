const Responses = require('../common/API_Response')
const DynamoDB = require('../common/DynamoDB')
const S3 = require('../common/S3')

const tableName = process.env.tableName
const bucketName = process.env.bucketName

module.exports.handler = async () => {
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
