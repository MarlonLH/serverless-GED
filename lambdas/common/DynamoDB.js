const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const DynamoDB = {
  async scan(TableName) {
    const params = {
      TableName
    }

    const data = await documentClient
      .scan(params)
      .promise()

    if (!data || !data.Items) {
      throw Error(`There is an error will scaning the table ${TableName}`)
    }

    return data.Items
  },
}

module.exports = DynamoDB
