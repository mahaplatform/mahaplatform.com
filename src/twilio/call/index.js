const Response = require('./response')
const identify = require('./identify')
const Request = require('./request')
const status = require('./status')
const Twilio = require('twilio')
const Redis = require('ioredis')
const dial = require('./dial')

const redis = new Redis({
  port: 6379,
  host: '172.31.31.51',
  db: 2,
  connectTimeout: 60000
})

const handle = async (req, res) => {
  const { config } = req
  const twiml = new Twilio.twiml.VoiceResponse()
  if(config.identify) identify(twiml, config.identify)
  dial(twiml, config)
  res.status(200).type('application/xml').send(twiml.toString())
}

exports.handler = async (event, context) => {

  const req = new Request(event)

  const res = new Response()

  const result = await handle(req, res)

  await status(req, result, redis)

  return res.render()

}
