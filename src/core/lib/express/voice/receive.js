import PhoneNumber from '@apps/maha/models/phone_number'
import { receiveCall, updateCall } from '@apps/maha/services/calls'
import collectObjects from '../../../utils/collect_objects'
import socket from '../../../services/routes/emitter'
import Call from '@apps/maha/models/call'
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

  const call = await Call.query(qb => {
    qb.where('sid', req.body.ParentCallSid)
  }).fetch({
    withRelated: ['enrollment'],
    transacting: req.trx
  })

  await updateCall(req, {
    call,
    status: 'in-progress'
  })

  const response = new twiml.VoiceResponse()

  const dial = response.dial()

  dial.queue(req.body.Queue)

  return res.status(200).type('text/xml').send(response.toString())

}

const place = async(req, res) => {

  const call = await Call.query(qb => {
    qb.where('id', req.body.CallId)
  }).fetch({
    withRelated: ['team','from','to'],
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

  if(call.get('to_id')) {

    dial.number({
      statusCallback: `${process.env.TWIML_HOST}/voice/${call.get('id')}/status`,
      statusCallbackEvent: ['ringing','answered']
    }, call.related('to').get('number'))

  } else if(call.get('to_user_id')) {

    const client = dial.client({
      statusCallback: `${process.env.TWIML_HOST}/voice/${call.get('id')}/status`,
      statusCallbackEvent: ['ringing','answered']
    }, `user-${call.get('to_user_id')}`)

    const params = {
      id: call.get('id'),
      from_user_id: call.get('from_user_id'),
      to_user_id: call.get('to_user_id')
    }

    Object.keys(params).map(name => {
      client.parameter({
        name,
        value: params[name]
      })
    })

  }

  if(response) return res.status(200).type('text/xml').send(response.toString())

  res.status(200).send(null)

}

const receiveRoute = async (req, res) => {

  if(req.body.CallId) return await place(req, res)

  if(req.body.client) return await make(req, res)

  if(req.body.Queue) return await queue(req, res)

  await receive(req, res)

}

export default receiveRoute
