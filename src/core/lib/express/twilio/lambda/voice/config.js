const aws = require('./aws')

const getConfigPath = (req) => {
  const { query, body } = req
  const workflow = query.workflow
  const direction = body.Direction
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

  const s3 = new aws.S3()

  const data = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: `twiml/voice/${getConfigPath(req)}`
  }).promise()

  return JSON.parse(data.Body)

}

module.exports = fetchConfig
