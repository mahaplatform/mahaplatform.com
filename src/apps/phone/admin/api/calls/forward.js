import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const number = (twiml, config) => {

  const dial = twiml.dial({
    callerId: config.from,
    timeout: 10
  })

  dial.number({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, config.number)

}

const client = (twiml, config, extra) => {

  const dial = twiml.dial({
    timeout: 10
  })

  const client = dial.client({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
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

  const dial = twiml.dial({
    callerId: req.body.from,
    timeout: 10
  })

  if(req.body.client === 'maha') {
    client(twiml, {
      client: `${req.user.get('id')}`
    }, {
      action: 'forward',
      sid: req.body.sid
    })
  } else  {
    number(dial, `${req.user.get('cell_phone')}`)
  }

  const twcall = await twilio.calls(req.body.sid).update({
    twiml: twiml.toString()
  })

  res.status(200).respond(twcall)

}
export default forwardRoute
