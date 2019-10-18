import { updateCall } from '../../../../apps/maha/services/calls'
import socket from '../../../services/routes/emitter'
import twilio from '../../../services/twilio'

const statusRoute = async (req, res) => {

  const call = await twilio.calls(req.body.CallSid).fetch()

  await updateCall(req, {
    duration: call.duration,
    price: call.price ? Math.abs(call.price) : Math.ceil(call.duration / 60) * 0.0085,
    sid: call.sid,
    status: call.status
  })

  await socket.refresh(req, [
    '/admin/team/calls'
  ])

  res.status(200).send(null)

}

export default statusRoute
