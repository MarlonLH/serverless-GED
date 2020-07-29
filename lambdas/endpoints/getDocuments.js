const Responses = require('../common/API_Response')
const DynamoDB = require('../common/DynamoDB')

const tableName = process.env.tableName

module.exports.handler = async () => {
  const documents = await DynamoDB.scan(tableName).catch((error) => {
    console.log('Error in DynamoDB scan', error)
    return ({ failed: true, error })
  })

  if (!documents || documents.failed) {
    return Responses._400({ message: 'Failed to get documents.', error: documents && documents.error })
  }
  
  return Responses._200({ success: true, documents })
}