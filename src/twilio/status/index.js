const aws = require('aws-sdk')

exports.handler = async (event, context) => {

  aws.config.constructor({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  })

  const client = new aws.SecretsManager({
    region: process.env.AWS_REGION
  })

  const secret = await client.getSecretValue({
    SecretId: 'production'
  }).promise()

  const envvars = JSON.parse(secret.SecretString)

  return {
    statusCode: 200,
    body: JSON.stringify(Object.keys(process.env)),
    headers: {
      'Content-Type': 'application/json'
    }
  }

}
