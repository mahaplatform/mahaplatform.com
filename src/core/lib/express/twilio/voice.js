import TwilioStatusQueue from '@apps/maha/queues/twilio_status_queue'

const voiceRoute = async (req, res) => {

  TwilioStatusQueue.enqueue(req, req.body)

  res.status(200).respond(true)

}

export default voiceRoute
