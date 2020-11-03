import { twiml } from 'twilio'

const questionStep = async (req, { config, enrollment, execute, step, answer }) => {

  const { code, message, recording_id, strategy, voice } = config

  if(execute === false) {
    return {
      action: {
        asset_id: recording_id,
        data: {
          question: message,
          answer,
          [code]: answer
        }
      }
    }
  }

  const response = new twiml.VoiceResponse()

  const gather = response.gather({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/gather`,
    method: 'POST',
    timeout: 3,
    finishOnKey: ''
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

export default questionStep
