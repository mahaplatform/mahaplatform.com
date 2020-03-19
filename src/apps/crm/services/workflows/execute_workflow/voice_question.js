import { twiml } from 'twilio'

const voiceQuestion = async (req, { config, enrollment, step, answer }) => {

  const { strategy, voice, message, digits } = config

  if(response) {

    const branch = step.get('config').branches.find(branch => {
      return branch.value === answer
    })

    return {
      data: {
        answer: branch ? branch.code : 'else'
      },
      condition: {
        parent: step.get('code'),
        answer: branch ? branch.code : 'else',
        delta: -1
      }
    }

  }

  const response = new twiml.VoiceResponse()

  const gather = response.gather({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/gather`,
    method: 'POST',
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
