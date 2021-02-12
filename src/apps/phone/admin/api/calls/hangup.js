import { createCallActivity } from '@apps/maha/services/calls'
import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const hangupRoute = async (req, res) => {

  const twiml = new Twilio.twiml.VoiceResponse()

  twiml.hangup()

  await createCallActivity(req, {
    sid: req.body.call_sid,
    type: 'hangup'
  })

  const twcall = await twilio.calls(req.body.sid).update({
    twiml: twiml.toString()
  })

  res.status(200).respond(twcall)

}

export default hangupRoute
