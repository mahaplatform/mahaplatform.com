import { twiml } from 'twilio'

const outbound = async () => {
  const { VoiceResponse } = twiml
  const response = new VoiceResponse()
  response.say('The Maha Platform is the shit!')
  return response.toString()
}

const inbound = async () => {
  const { VoiceResponse } = twiml
  const response = new VoiceResponse()
  response.say('The Maha Platform is the shit!')
  return response.toString()
}

const showRoute = async (req, res) => {

  const { Direction } = req.body

  const responseCreator = Direction === 'outbound-api' ? outbound : inbound

  const data = await responseCreator()

  res.status(200).type('application/xml').send(data)

}

export default showRoute
