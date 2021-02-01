import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const holdRoute = async (req, res) => {

  const { sid } = req.body

  const twiml = new Twilio.twiml.VoiceResponse()

  twiml.play({
    loop: 0
  },'http://com.twilio.sounds.music.s3.amazonaws.com/ClockworkWaltz.mp3')

  const twcall = await twilio.calls(sid).update({
    twiml: twiml.toString()
  })

  res.status(200).respond(twcall)

}

export default holdRoute
