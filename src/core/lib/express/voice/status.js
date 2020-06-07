import { updateCall } from '../../../../apps/maha/services/calls'
import collectObjects from '../../../utils/collect_objects'
import socket from '../../../services/routes/emitter'
import Call from '../../../../apps/maha/models/call'
import twilio from '../../../services/twilio'

const hooks = collectObjects('hooks/voice/status.js')

const statusRoute = async (req, res) => {

  const call = await Call.query(qb => {
    if(req.params.id) {
      qb.where('id', req.params.id)
    } else if(req.body.CallSid) {
      qb.where('sid', req.body.CallSid)
    }
  }).fetch({
    withRelated: ['to','from','team'],
    transacting: req.trx
  })

  req.team = call.related('team')

  const twilioCall = await twilio.calls(call.get('sid')).fetch()

  const { duration, price, sid, status } = twilioCall

  await updateCall(req, {
    duration,
    price: price ? Math.abs(price) : Math.ceil(duration / 60) * 0.0085,
    sid,
    status
  })

  await Promise.reduce(hooks, async (response, hook) => {
    return await hook.default(req, {
      call,
      status
    })
  }, null)

  await socket.refresh(req, [
    '/admin/team/calls',
    `/admin/calls/${call.get('id')}`
  ])

  res.status(200).send(null)

}

export default statusRoute
