import TwilioStatusQueue from '@apps/maha/queues/twilio_status_queue'
import socket from '@core/services/routes/emitter'

const normalize = (body) => {
  if(body.ParentCallSid) {
    body.CallSid = body.ParentCallSid
    body.ChildCallSid = body.CallSid
    delete body.ParentCallSid
  }
  return {
    data: {
      sid: body.CallSid,
      answered_by: body.AnsweredBy,
      child_sid: body.ChildCallSid,
      direction: body.Direction,
      from: body.From,
      to: body.To,
      status: body.CallStatus
    },
    tstamp: body.Timestamp,
    meta: body.Meta,
    result: body.Result
  }
}

const statusRoute = async (req, res) => {

  const job = normalize(req.body)

  await TwilioStatusQueue.enqueue(req, job)

  await socket.message(req, {
    channel: `/calls/${job.data.sid}`,
    action: 'callstatus',
    data: job.data
  })

  res.status(200).respond(true)

}

export default statusRoute
