const aws = require('./aws')

const sm = new aws.SecretsManager()

const env = async () => {

  if(!process.env.AWS_LAMBDA_FUNCTION_NAME) return

  const data = await sm.getSecretValue({
    SecretId: process.env.NODE_ENV
  }).promise()

  const secrets = JSON.parse(data.SecretString)

  Object.keys(secrets).map(key=> {
    process.env[key] = secrets[key]
  })

}

env()
