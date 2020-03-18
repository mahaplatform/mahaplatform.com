import { twiml } from 'twilio'

const message = async (req, { config, contact, enrollment, step, tokens }) => {

  const { strategy, voice, message } = config

  const response = new twiml.VoiceResponse()

  const gather = response.gather({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/gather`,
    method: 'POST',
    numDigits: 1
  })

  if(strategy === 'play') {

    gather.play({
      loop: 0
    }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${step.get('code')}/recording`)

  } else if(strategy === 'say') {

    gather.say({
      voice
    }, message)

  }

  return {
    twiml: response.toString()
  }

}

export default message
