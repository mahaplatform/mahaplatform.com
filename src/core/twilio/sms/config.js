const aws = require('aws-sdk')

const getPath = (req) => {
  const { body } = req
  const message = body.Body
  const from = body.From
  const to = body.To
  const term = req.session.term || message
  return to.substr(1)
}

const getConfigPath = (req) => {
  const path = getPath(req)
  const message = body.Body
  const term = req.session.term || message
  return `${path}/${message.toLowerCase()}`
}

const fetchConfig = async (req) => {

  try {

    aws.config.constructor({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      sessionToken: process.env.AWS_SESSION_TOKEN
    })

    const s3 = new aws.S3()

    const keys = await s3.listObjects({
      Bucket: process.env.AWS_BUCKET,
      Prefix: `twiml/sms/${getConfigPath()}`
    }).promise()

    console.log(keys)

    const data = await s3.getObject({
      Bucket: process.env.AWS_BUCKET,
      Key: `twiml/sms/${getConfigPath(req)}`
    }).promise()

    return JSON.parse(data.Body)

  } catch(err) {
    return null
  }

}

module.exports = fetchConfig
