const aws = require('aws-sdk')

const getConfigPath = (req) => {
  const { body } = req
  const to = body.To
  const term = req.session.term || body.Body
  return `${to.substr(1)}/${term.toLowerCase()}`
}

const fetchConfig = async (req) => {

  const s3 = new aws.S3()

  const data = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: `twiml/sms/${getConfigPath(req)}`
  }).promise()

  return JSON.parse(data.Body)

}

module.exports = fetchConfig
