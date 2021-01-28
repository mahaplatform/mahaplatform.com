import TwilioStatusQueue from '@apps/maha/queues/twilio_status_queue'
import CallSerializer from '@apps/phone/serializers/call_serializer'
import socket from '@core/services/routes/emitter'
import twilio from '@core/vendor/twilio'

const statusRoute = async (req, res) => {


  const sid = req.body.ParentCallSid || req.body.CallSid

  // await TwilioStatusQueue.enqueue(req, {
  //   sid: ParentCallSid || CallSid,
  //   data: { foo: 1 },
  //   tstamp: body.Timestamp
  // })

  await socket.message(req, {
    channel: `/calls/${sid}`,
    action: 'callstatus',
    data: {
      parent_sid: sid,
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
