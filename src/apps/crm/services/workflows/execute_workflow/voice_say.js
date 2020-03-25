import { twiml } from 'twilio'
import ejs from 'ejs'

const say = async (req, { enrollment, step, tokens }) => {

  const { message, voice } = step.get('config')

  const response = new twiml.VoiceResponse()

  const rendered = ejs.render(message, tokens)

  response.say({
    voice
  }, rendered)

  response.redirect({
    method: 'POST'
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/next`)

  return {
    twiml: response.toString()
  }

}

export default say