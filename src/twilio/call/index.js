const Response = require('./response')
const Request = require('./request')
const Twilio = require('twilio')

const aws = require('aws-sdk')

const handle = async (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse()
  twiml.say('Connecting you to Suli Kops')
  twiml.dial('+16072807552')
  res.status(200).type('application/xml').send(twiml.toString())
}

exports.handler = async (event, context) => {

  aws.config.constructor({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    sessionToken: process.env.AWS_SESSION_TOKEN
  })

  const s3 = new aws.S3()

  const data = await s3.getObject({
    Bucket: 'cdn.mahaplatform.com',
    Key: 'twiml/voice/inbound/16072462347'
  }).promise()


  console.log(JSON.parse(data.Body))

  const req = new Request(event)

  const res = new Response()

  await handle(req, res)

  return res.render()

}
