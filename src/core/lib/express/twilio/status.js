import TwilioStatusQueue from '@apps/maha/queues/twilio_status_queue'
import CallSerializer from '@apps/phone/serializers/call_serializer'
import socket from '@core/services/routes/emitter'
import twilio from '@core/vendor/twilio'

const getParent = async (sid) => {
  const twcall = await twilio.calls(sid).fetch()
  if(!twcall.parentCallSid) return twcall
  return await getParent(twcall.parentCallSid)
}

const statusRoute = async (req, res) => {

  const twcall = await getParent(req.body.CallSid)

  console.log(twcall.sid, req.body.ParentCallSid, req.body.CallSid, req.body.CallStatus)

  await TwilioStatusQueue.enqueue(req, {
    sid: twcall.sid,
    body: req.body
  })

  await socket.message(req, {
    channel: `/calls/${twcall.sid}`,
    action: 'callstatus',
    data: {
      parent_sid: twcall.sid,
      sid: req.body.CallSid,
      direction:req.body.Direction,
      from: req.body.From,
      to: req.body.To,
      status: req.body.CallStatus
    }
  })

  res.status(200).respond(true)

}

export default statusRoute
