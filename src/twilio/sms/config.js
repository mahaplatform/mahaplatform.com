const aws = require('aws-sdk')

const getConfigPath = (req) => {
  const { body } = req
  const message = body.Body
  const from = body.From
  const to = body.To
  const term = req.session.term || message
  return `${to.substr(1)}/${message.toLowerCase()}`
}

const fetchConfig = async (req) => {

  aws.config.constructor({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    sessionToken: process.env.AWS_SESSION_TOKEN
  })

  const s3 = new aws.S3()

  const data = await s3.getObject({
    Bucket: 'cdn.mahaplatform.com',
    Key: `twiml/sms/${getConfigPath(req)}`
  }).promise()

  return JSON.parse(data.Body)

}

module.exports = fetchConfig
