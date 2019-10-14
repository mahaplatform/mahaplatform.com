import { twiml } from 'twilio'

const receive = async (req, sms) => {

  const response = new twiml.VoiceResponse()

  response.redirect({
    method: 'GET'
  }, `${process.env.TWIML_HOST}/voice/crm/recording`)

  console.log(response.toString())

  return response.toString()

}

export default receive
