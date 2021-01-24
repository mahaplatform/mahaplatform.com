const aws = require('aws-sdk')

exports.handler = async (event, context) => {

  const client = new aws.SecretsManager({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    sessionToken: process.env.AWS_SESSION_TOKEN
  })

  const secret = await client.getSecretValue({
    SecretId: 'production'
  }).promise()

  const envvars = JSON.parse(secret.SecretString)

  return {
    statusCode: 200,
    body: 'foo',
    headers: {
      'Content-Type': 'application/json'
    }
  }

}
