import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const unholdRoute = async (req, res) => {

  const { sid } = req.body

  const twiml = new Twilio.twiml.VoiceResponse()

  const dial = twiml.dial()

  const client = dial.client({
    statusCallback: `${process.env.TWILIO_HOST_STATUS}/voice-status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, req.user.get('id'))

  client.parameter({
    name: 'action',
    value: 'unhold'
  })

  client.parameter({
    name: 'sid',
    value: sid
  })

  const twcall = await twilio.calls(sid).update({
    twiml: twiml.toString()
  })

  res.status(200).respond(twcall)

}

export default unholdRoute
