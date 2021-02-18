import identify from './identify'
import Twilio from 'twilio'
import dial from './dial'
import atob from 'atob'

const parseConfig = (req) => {
  const config = req.body.config || req.query.config
  return JSON.parse(atob(config))
}

const receiveRoute = async (req, res) => {

  const twiml = new Twilio.twiml.VoiceResponse()

  const config = parseConfig(req)

  identify(twiml, config)

  dial(twiml, config)

  twiml.hangup()

  res.status(200).type('application/xml').send(twiml.toString())

}

export default receiveRoute
