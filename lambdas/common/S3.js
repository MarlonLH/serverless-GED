const AWS = require('aws-sdk')
const uuid = require('uuid')

const s3Client = new AWS.S3()

const S3 = {
  async getPresignedURL(Bucket) {
    const UUID = uuid.v4()

    const s3Params = {
      Bucket,
      Key: `file/${UUID}`,
      ACL: 'public-read',
    }

    const uploadURL = await s3Client.getSignedUrl('putObject', s3Params)
    
    if (!uploadURL) {
      throw Error('Error with s3 getSignedURL')
    }
  
    return ({ UUID, uploadURL })
  },
}

module.exports = S3
