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

  async write(data, TableName) {
    if (!data.UUID) {
      throw Error('No uuid in the data')
    }

    const params = {
      TableName,
      Item: data,
    }

    const res = await documentClient
      .put(params)
      .promise()

    if (!res) {
      throw Error(`There was an error inserting ID ${data.UUID} in table ${TableName}`)
    }

    return data
  },
}

module.exports = DynamoDB
