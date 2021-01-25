const Response = require('./response')
const Request = require('./request')
const Twilio = require('twilio')
const Bull = require('bull')

const queue = new Bull('twilio', 'redis://172.31.31.51:6379/2')

const handle = async (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse()
  twiml.say('Connecting you to Suli Kops')
  twiml.dial('+16072807552')
  res.status(200).type('application/xml').send(twiml.toString())
}

exports.handler = async (event, context) => {

  const req = new Request(event)

  const res = new Response()

  const result = await handle(req, res)

  await status(req, result, queue)

  return res.render()

}
