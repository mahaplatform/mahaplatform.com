import { twiml } from 'twilio'

const hangupStep = async (req) => {

  const response = new twiml.VoiceResponse()

  response.hangup()

  return {
    twiml: response.toString()
  }

}

export default hangupStep
