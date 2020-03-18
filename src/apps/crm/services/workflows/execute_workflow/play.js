import { twiml } from 'twilio'

const play = async (req, { enrollment, step }) => {

  const { loop } = step.get('config')

  const response = new twiml.VoiceResponse()

  response.play({
    loop
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${step.get('code')}/recording`)

  response.redirect({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/next`,
    method: 'POST'
  })

  return {
    twiml: response.toString()
  }

}

export default play
