const aws = require('aws-sdk')

const getConfigPath = (req) => {
  const { query, body } = req
  const workflow = query.workflow
  const direction = body.Direction
  const from = body.From
  const to = body.To
  if(direction === 'inbound') {
    return `inbound/${to.substr(1)}`
  }
  if(direction === 'outbound-api') {
    if(workflow !== undefined) {
      return `outbound/${workflow}`
    }
  }
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
    Bucket: process.env.AWS_BUCKET,
    Key: `twiml/voice/${getConfigPath(req)}`
  }).promise()

  return JSON.parse(data.Body)

}

module.exports = fetchConfig
