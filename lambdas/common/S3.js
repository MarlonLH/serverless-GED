const AWS = require('aws-sdk')
const uuid = require('uuid')

const s3Client = new AWS.S3()

const S3 = {
  async getPresignedURL(Bucket) {
    const UUID = uuid.v4()
    const url = `https://${Bucket}.s3.amazonaws.com/${UUID}`

    const s3Params = {
      Bucket,
      Key: UUID,
      ACL: 'public-read',
    }

    const uploadURL = await s3Client.getSignedUrl('putObject', s3Params)
    
    if (!uploadURL) {
      throw Error('Error with s3 getSignedURL')
    }
  
    return ({ UUID, uploadURL, url })
  },
}

module.exports = S3
