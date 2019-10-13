import { twiml } from 'twilio'

const receive = async (req, sms) => {

  const response = new twiml.VoiceResponse()

  response.say('Got it')

  return response.toString()

}

export default receive
