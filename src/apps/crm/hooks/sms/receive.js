import { twiml } from 'twilio'

const receive = async (req, sms) => {

  const response = new twiml.MessagingResponse()

  response.message({
    action: `${process.env.TWIML_HOST}/sms/delivered`
  }, 'Got it')

  return response.toString()

}

export default receive
