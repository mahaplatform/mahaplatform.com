import { updateCall } from '../../../../../apps/maha/services/calls'
import socket from '../../../../services/routes/emitter'
import twilio from '../../../../services/twilio'

const feedbackRoute = async (req, res) => {

  const call = await twilio.calls(req.body.CallSid).fetch()

  await updateCall(req, {
    duration: call.duration,
    price: Math.abs(call.price),
    sid: call.sid,
    status: call.status
  })

  await socket.refresh(req, [
    '/admin/team/calls'
  ])

  res.status(200).send(true)

}

export default feedbackRoute
