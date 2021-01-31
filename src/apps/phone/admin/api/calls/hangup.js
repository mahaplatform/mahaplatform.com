import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const hangupRoute = async (req, res) => {

  const { sid } = req.body

  const twiml = new Twilio.twiml.VoiceResponse()

  twiml.hangup()

  const twcall = await twilio.calls(sid).update({
    twiml: twiml.toString()
  })

  res.status(200).respond(twcall)

}

export default hangupRoute
