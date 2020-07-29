# Serverless-GED

A serverless electronic document management API

### Stack

- NodeJS
- Serverless Framework
- Lambda
- API Gateway
- S3
- DynamoDB

### API

- GET /documents - List all documents
- POST /documents - Give a presigned URL to upload a file
- GET /documents/:uuid - Give the presigned URL of the specified UUID

### Installing

To run this project, and deploy the serverless, you'll need first to install it.

```
npm install serverless -g
```

You then need to install all the required packages.

```
npm install
```

### Deploy

```
serverless deploy
```
