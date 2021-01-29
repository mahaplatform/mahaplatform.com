import User from '@apps/maha/models/user'
import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const number = (twiml, { from, number }) => {

  const dial = twiml.dial({
    callerId: from,
    timeout: 10
  })

  dial.number({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, number)

}

const client = (twiml, client, extra) => {

  const dial = twiml.dial({
    timeout: 10
  })

  const cdial = dial.client({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, client)

  Object.keys(extra).map(name => {
    cdial.parameter({
      name,
      value: extra[name]
    })
  })

}

const transferRoute = async (req, res) => {

  const twiml = new Twilio.twiml.VoiceResponse()

  if(req.body.number) {
    number(twiml, req.body)
    client(twiml, `${req.user.get('id')}`, { transfered_back_from: req.body.number })
  }

  if(req.body.user_id) {

    const user = await User.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('id', req.body.user_id)
    }).fetch({
      transacting: req.trx
    })

    client(twiml, `${user.get('id')}`, { transfered_from: req.user.get('full_name') })
    client(twiml, `${req.user.get('id')}`, { transfered_back_from: user.get('full_name') })

  }

  const twcall = await twilio.calls(req.body.sid).update({
    twiml: twiml.toString()
  })

  res.status(200).respond(twcall)

}

export default transferRoute
