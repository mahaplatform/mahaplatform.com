import twilio from '@core/vendor/twilio'
import Twilio from 'twilio'

const getQueue = async(friendlyName) => {

  const queues = await twilio.queues.list()

  const queue = queues.find(queue => {
    return queue.friendlyName === friendlyName
  })

  if(queue) return queue

  return await twilio.queues.create({ friendlyName })

}

const holdRoute = async (req, res) => {

  const { queue } = req.body

  const twiml = new Twilio.twiml.VoiceResponse()

  await getQueue(queue)

  twiml.enqueue(queue)

  const twcall = await twilio.calls(req.body.sid).update({
    twiml: twiml.toString()
  })

  res.status(200).respond(twcall)

}

export default holdRoute
