require('./env')
const Response = require('./response')
const identify = require('./identify')
const Request = require('./request')
const status = require('./status')
const Twilio = require('twilio')
const dial = require('./dial')

const handle = async (req, res) => {
  const { config } = req
  const twiml = new Twilio.twiml.VoiceResponse()
  identify(twiml, config)
  dial(twiml, config)
  res.status(200).type('application/xml').send(twiml.toString())
}

exports.handler = async (event, context) => {

  if(!process.env.TWILIO_HOST_TWIML) {
    await new Promise(resolve => {
      setTimeout(resolve, 500)
    })
  }
  
  const req = new Request(event)

  const res = new Response()

  const result = await handle(req, res)

  await status(req, result)

  return res.render()

}
