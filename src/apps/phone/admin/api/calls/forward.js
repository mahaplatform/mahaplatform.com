import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const number = (twiml, config) => {

  const dial = twiml.dial({
    callerId: config.from,
    timeout: 10
  })

  dial.number({
    statusCallback: `${process.env.TWILIO_HOST_STATUS}/twilio/voice_status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, config.number)

}

const client = (twiml, config, extra) => {

  const dial = twiml.dial({
    timeout: 10
  })

  const client = dial.client({
    statusCallback: `${process.env.TWILIO_HOST_STATUS}/twilio/voice_status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, config.client)

  Object.keys(extra).map(name => {
    client.parameter({
      name,
      value: extra[name]
    })
  })

}


const forwardRoute = async (req, res) => {

  const twiml = new Twilio.twiml.VoiceResponse()

  if(req.body.client === 'maha') {
    client(twiml, {
      client: `${req.user.get('id')}`
    }, {
      action: 'forward',
      sid: req.body.sid
    })
  } else  {
    number(twiml, {
      from: req.body.from,
      number: `${req.user.get('cell_phone')}`
    })
  }

  await twilio.calls(req.body.sid).update({
    twiml: twiml.toString()
  })

  const children = await twilio.calls.list({
    parentCallSid: req.body.sid
  })

  const newcall = children.find(child => {
    const to = req.body.client === 'maha' ? `client:${req.user.get('id')}` : req.user.get('cell_phone')
    return child.status === 'queued' && child.to === to
  })

  res.status(200).respond(newcall)

}
export default forwardRoute
