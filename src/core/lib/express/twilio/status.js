import TwilioStatusQueue from '@apps/maha/queues/twilio_status_queue'
import socket from '@core/services/routes/emitter'

const statusRoute = async (req, res) => {

  if(req.body.ParentCallSid) {
    req.body.CallSid = req.body.ParentCallSid
    req.body.ChildCallSid = req.body.CallSid
    delete req.body.ParentCallSid
  }

  await TwilioStatusQueue.enqueue(req, req.body)

  await socket.message(req, {
    channel: `/calls/${req.body.CallSid}`,
    action: 'callstatus',
    data: req.body
  })

  res.status(200).respond(true)

}

export default statusRoute
