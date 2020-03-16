import { twiml } from 'twilio'

const say = async (req, { enrollment, step }) => {

  const { message, voice } = step.get('config')

  const response = new twiml.VoiceResponse()

  response.say({
    voice
  }, message)

  response.redirect({
    method: 'POST'
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/next`)

  return {
    twiml: response.toString()
  }

}

export default say
