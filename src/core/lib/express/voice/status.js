import { updateCall } from '../../../../apps/maha/services/calls'
import collectObjects from '../../../utils/collect_objects'
import socket from '../../../services/routes/emitter'
import Call from '../../../../apps/maha/models/call'
import twilio from '../../../services/twilio'

const hooks = collectObjects('hooks/voice/status.js')

const statusRoute = async (req, res) => {

  const twilioCall = await twilio.calls(req.body.CallSid).fetch()

  const { duration, price, sid, status } = twilioCall

  const call = await Call.query(qb => {
    qb.where('sid', sid)
  }).fetch({
    transacting: req.trx
  })

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
    '/admin/team/calls'
  ])

  res.status(200).send(null)

}

export default statusRoute
