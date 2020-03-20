import { twiml } from 'twilio'

const voiceQuestion = async (req, { config, enrollment, step, answer }) => {

  const { code, digits, message, strategy, voice } = config

  if(answer) {

    return {
      data: {
        [code]: answer
      }
    }

  }

  const response = new twiml.VoiceResponse()

  const gather = response.gather({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/gather`,
    method: 'POST',
    timeout: 10,
    finishOnKey: '',
    numDigits: digits
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

export default voiceQuestion
