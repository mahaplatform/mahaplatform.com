import User from '@apps/maha/models/user'
import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const number = (twiml, config) => {

  const dial = twiml.dial({
    callerId: config.from,
    timeout: 10
  })

  dial.number({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/voice_status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, config.number)

}

const client = (twiml, config, extra) => {

  const dial = twiml.dial({
    timeout: 10
  })

  const client = dial.client({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/voice_status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, config.client)

  Object.keys(extra).map(name => {
    client.parameter({
      name,
      value: extra[name]
    })
  })

}

const transferRoute = async (req, res) => {

  const twiml = new Twilio.twiml.VoiceResponse()

  if(req.body.number) {
    number(twiml, req.body)
    client(twiml, {
      client: `${req.user.get('id')}`
    }, {
      action: 'transfer',
      sid: req.body.sid,
      transfered_back_from: req.body.number
    })
  }

  if(req.body.user_id) {

    const user = await User.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('id', req.body.user_id)
    }).fetch({
      transacting: req.trx
    })

    client(twiml, {
      client: `${user.get('id')}`
    }, {
      action: 'transfer',
      sid: req.body.sid,
      transfered_from: req.user.get('full_name')
    })

    client(twiml, {
      client: `${req.user.get('id')}`
    }, {
      action: 'transfer',
      sid: req.body.sid,
      transfered_back_from: user.get('full_name')
    })

  }

  await twilio.calls(req.body.sid).update({
    twiml: twiml.toString()
  })

  const children = await twilio.calls.list({
    parentCallSid: req.body.sid
  })

  const newcall = children.find(child => {
    return child.status === 'queued' && child.to === `client:${req.body.user_id}`
  })

  res.status(200).respond(newcall)

}

export default transferRoute
