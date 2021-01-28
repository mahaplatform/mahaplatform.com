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

const getHold = async (twiml, { queue }) => {
  await getQueue(queue)
  twiml.enqueue(queue)
}

const number = (dial, number) => {
  dial.number({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, number)
}

const client = (dial, client) => {
  dial.client({
    statusCallback: `${process.env.TWILIO_STATUS_HOST}/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed']
  }, client)
}

const getDial = async (twiml, body) => {
  const dial = twiml.dial({
    callerId: body.from
  })
  if(body.number) number(dial, body.number)
  if(body.client) client(dial, body.client)
}

const getTwiml = async (body) => {
  const twiml = new Twilio.twiml.VoiceResponse()
  if(body.action === 'queue') await getHold(twiml, body)
  if(body.action === 'dial') await getDial(twiml, body)
  return twiml.toString()
}

const updateRoute = async (req, res) => {

  const twcall = await twilio.calls(req.body.sid).update({
    twiml: await getTwiml(req.body)
  })

  res.status(200).respond(twcall)

}

export default updateRoute
