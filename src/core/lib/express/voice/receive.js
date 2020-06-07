import PhoneNumber from '../../../../apps/maha/models/phone_number'
import { receiveCall } from '../../../../apps/maha/services/calls'
import collectObjects from '../../../utils/collect_objects'
import socket from '../../../services/routes/emitter'
import Call from '../../../../apps/maha/models/call'
import twilio from '../../../services/twilio'
import { twiml } from 'twilio'

const receiveHooks = collectObjects('hooks/voice/receive.js')

const makeHooks = collectObjects('hooks/voice/make.js')

const receive = async (req, res) => {

  const incoming = req.body

  const params = await twilio.calls(incoming.CallSid).fetch()

  const { from, sid, status, to } = params

  const phone_number = await PhoneNumber.where({
    number: to
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = phone_number.related('team')

  const call = await receiveCall(req, {
    from,
    to,
    sid,
    status
  })

  await call.load(['from','to'], {
    transacting: req.trx
  })

  const response = await Promise.reduce(receiveHooks, async (response, hook) => {
    return await hook.default(req, {
      call,
      phone_number
    })
  }, null)

  await socket.refresh(req, [
    '/admin/team/calls'
  ])

  if(response) return res.status(200).type('text/xml').send(response)

  res.status(200).send(null)

}

const make = async (req, res) => {

  const phone_number = await PhoneNumber.where({
    number: req.body.From
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = phone_number.related('team')

  const call = await receiveCall(req, {
    direction: 'outbound',
    from: req.body.From,
    to: req.body.To,
    sid: req.body.CallSid,
    status: 'pending'
  })

  await call.load(['from','to'], {
    transacting: req.trx
  })

  const response = await Promise.reduce(makeHooks, async (response, hook) => {
    return await hook.default(req, {
      client: req.body.client,
      user_id: req.body.user_id,
      call,
      phone_number
    })
  }, null)

  await socket.refresh(req, [
    '/admin/team/calls'
  ])

  if(response) return res.status(200).type('text/xml').send(response)

  res.status(200).send(null)

}

const queue = async (req, res) => {

  const response = new twiml.VoiceResponse()

  const dial = response.dial()

  dial.queue({}, req.body.queue)

  return res.status(200).type('text/xml').send(response.toString())

}

const place = async(req, res) => {

  const call = await Call.query(qb => {
    qb.where('id', req.body.call_id)
  }).fetch({
    withRelated: ['team','from','to','phone_number','user'],
    transacting: req.trx
  })

  req.team = call.related('team')

  await call.save({
    sid: req.body.CallSid
  }, {
    transacting: req.trx
  })

  const response = new twiml.VoiceResponse()

  const dial = response.dial({
    callerId: call.related('from').get('number')
  })

  dial.number(call.related('to').get('number'))

  if(response) return res.status(200).type('text/xml').send(response.toString())

  res.status(200).send(null)

}

const receiveRoute = async (req, res) => {

  if(req.body.call_id) return await place(req, res)

  if(req.body.client) return await make(req, res)

  if(req.body.queue) return await queue(req, res)

  await receive(req, res)

}

export default receiveRoute
