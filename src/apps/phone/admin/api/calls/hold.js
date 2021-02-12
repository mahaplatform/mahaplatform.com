import { createCallActivity } from '@apps/maha/services/calls'
import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const holdRoute = async (req, res) => {

  const twiml = new Twilio.twiml.VoiceResponse()

  twiml.play({
    loop: 0
  },'http://com.twilio.sounds.music.s3.amazonaws.com/ClockworkWaltz.mp3')

  await createCallActivity(req, {
    sid: req.body.call_sid,
    type: 'hold'
  })

  const twcall = await twilio.calls(req.body.sid).update({
    twiml: twiml.toString()
  })

  res.status(200).respond(twcall)

}

export default holdRoute
