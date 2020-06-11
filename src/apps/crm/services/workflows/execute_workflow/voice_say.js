import { twiml } from 'twilio'
import ejs from 'ejs'

const say = async (req, { enrollment, execute, step, tokens }) => {

  if(execute === false) {
    return {
      action: {
        data: {
          message: rendered
        }
      }
    }
  }

  const { message, voice } = step.get('config')

  const rendered = ejs.render(message, tokens)

  const response = new twiml.VoiceResponse()

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
