import PhoneNumber from '@apps/maha/models/phone_number'
import { receiveCall } from '@apps/maha/services/calls'
import { executeHooks } from '@core/services/hooks'
import socket from '@core/services/routes/emitter'
import Call from '@apps/maha/models/call'
import Twilio from 'twilio'

const getCall = async (req) => {

  if(req.query.call_id) {
    return await Call.query(qb => {
      qb.where('id', req.query.call_id)
    }).fetch({
      transacting: req.trx
    })
  }

  return receiveCall(req, {
    from: req.body.From,
    to: req.body.To,
    sid: req.body.CallSid,
    status: req.body.CallStatus
  })

}

const receive = async (req, res) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', req.body.To)
    qb.orderBy('id', 'asc')
  }).fetch({
    withRelated: ['program','team'],
    transacting: req.trx
  })

  req.team = phone_number.related('team')

  const call = await getCall(req)

  await call.load(['from_number','from_number'], {
    transacting: req.trx
  })

  const twiml = new Twilio.twiml.VoiceResponse()

  await executeHooks(req, 'voice-receive', {
    call,
    phone_number,
    twiml
  })

  await socket.refresh(req, [
    '/admin/team/calls'
  ])

  return res.status(200).type('text/xml').send(twiml.toString())

}

export default receive
