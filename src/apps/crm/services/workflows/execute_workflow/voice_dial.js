import { twiml } from 'twilio'

const dial = async (req, { config, enrollment, step }) => {

  const { number } = config

  const response = new twiml.VoiceResponse()

  response.dial(number)

  response.redirect({
    method: 'POST'
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/next`)

  return {
    twiml: response.toString()
  }

}

export default dial
