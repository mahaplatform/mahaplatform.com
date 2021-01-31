import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const number = (dial, { from, number }) => {
  dial.number({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, number)
}

const client = (dial, client, extra) => {
  const cdial = dial.client({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, client)
}

const forwardRoute = async (req, res) => {

  const twiml = new Twilio.twiml.VoiceResponse()

  const dial = twiml.dial({
    callerId: req.body.from,
    timeout: 10
  })

  if(req.body.client === 'maha') {
    client(dial, `${req.user.get('id')}`)
  } else  {
    number(dial, `${req.user.get('cell_phone')}`)
  }

  const twcall = await twilio.calls(req.body.sid).update({
    twiml: twiml.toString()
  })

  res.status(200).respond(twcall)

}
export default forwardRoute
