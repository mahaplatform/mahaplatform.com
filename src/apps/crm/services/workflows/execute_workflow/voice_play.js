import { twiml } from 'twilio'

const play = async (req, { enrollment, step }) => {

  const { loop } = step.get('config')

  const response = new twiml.VoiceResponse()

  response.play({
    loop
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${step.get('code')}/recording`)

  response.redirect({
    method: 'POST'
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/next`)

  return {
    twiml: response.toString()
  }

}

export default play
