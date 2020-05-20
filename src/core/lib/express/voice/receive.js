import PhoneNumber from '../../../../apps/maha/models/phone_number'
import { receiveCall } from '../../../../apps/maha/services/calls'
import collectObjects from '../../../utils/collect_objects'
import socket from '../../../services/routes/emitter'
import twilio from '../../../services/twilio'

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

const receiveRoute = async (req, res) => {

  const { client } = req.body

  if(client === 'maha') return await make(req, res)

  await receive(req, res)

}

export default receiveRoute
