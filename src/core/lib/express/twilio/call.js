import TwilioStatusQueue from '@apps/maha/queues/twilio_status_queue'
import socket from '@core/services/routes/emitter'

const callRoute = async (req, res) => {

  await TwilioStatusQueue.enqueue(req, req.body)

  await socket.message(req, {
    channel: [
      `/calls/${req.body.parent_sid}`,
      `/calls/${req.body.sid}`,
    ],
    action: 'callstatus',
    data: req.body
  })

  console.log(req.body)

  res.status(200).respond(true)

}

export default callRoute
