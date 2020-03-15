import { twiml } from 'twilio'

const hangup = async (req) => {

  const response = new twiml.VoiceResponse()

  response.hangup()

  return {
    twiml: response.toString()
  }

}

export default hangup
