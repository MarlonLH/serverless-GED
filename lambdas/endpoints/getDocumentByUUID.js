const Responses = require('../common/API_Response')
const DynamoDB = require('../common/DynamoDB')

const tableName = process.env.tableName

module.exports.handler = async (event) => {
  const { pathParameters } = event

  if (!pathParameters || !pathParameters.uuid && typeof pathParameters.uuid !== 'string') {
    return Responses._400({ message: 'No UUID provided.' })
  }

  const document = await DynamoDB.get(pathParameters.uuid, tableName).catch((error) => {
    console.log('Error in DynamoDB scan', error)
    return ({ failed: true, error })
  })

  if (!document || document.failed) {
    return Responses._400({ message: 'Failed to get document.', error: document && document.error })
  }
  
  return Responses._200({ success: true, document })
}