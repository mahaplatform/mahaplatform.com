import TwilioStatusQueue from '@apps/maha/queues/twilio_status_queue'
import socket from '@core/services/routes/emitter'
import twilio from '@core/vendor/twilio'

const getParent = async (sid) => {
  const twcall = await twilio.calls(sid).fetch()
  if(!twcall.parentCallSid) return twcall
  return await getParent(twcall.parentCallSid)
}

const voiceStatusRoute = async (req, res) => {

  const parent = await getParent(req.body.CallSid)

  await TwilioStatusQueue.enqueue(req, {
    parent_sid: parent.sid,
    sid: req.body.CallSid,
    body: req.body
  }, {
    delay: 5000
  })

  await socket.message(req, {
    channel: '/calls',
    action: 'callstatus',
    data: {
      parent_sid: parent.sid,
      sid: req.body.CallSid,
      direction:req.body.Direction,
      from: req.body.From,
      to: req.body.To,
      status: req.body.CallStatus
    }
  })

  res.status(200).respond(true)

}

export default voiceStatusRoute
