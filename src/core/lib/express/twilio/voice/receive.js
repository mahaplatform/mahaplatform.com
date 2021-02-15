import PhoneNumber from '@apps/maha/models/phone_number'
import collectObjects from '@core/utils/collect_objects'
import { receiveCall } from '@apps/maha/services/calls'
import socket from '@core/services/routes/emitter'

const hooks = collectObjects('hooks/voice/receive.js')

const receive = async (req, res) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', req.body.To)
    qb.orderBy('id', 'asc')
  }).fetch({
    withRelated: ['program','team'],
    transacting: req.trx
  })

  req.team = phone_number.related('team')

  const call = await receiveCall(req, {
    from: req.body.From,
    to: req.body.To,
    sid: req.body.CallSid,
    status: req.body.CallStatus
  })

  await call.load(['from_number','from_number'], {
    transacting: req.trx
  })

  const response = await Promise.reduce(hooks, async (response, hook) => {
    return response || await hook.default(req, {
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

export default receive
