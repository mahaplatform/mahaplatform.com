import { twiml } from 'twilio'

const voicemail = async (req, { config, enrollment, step, recording }) => {

  const { message, strategy, voice } = config

  if(recording) {
    return {
      recording_data: recording
    }
  }

  const response = new twiml.VoiceResponse()

  if(strategy === 'play') {

    response.play({
      loop: 1
    }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${step.get('code')}/recording`)

  } else if(strategy === 'say') {

    response.say({
      voice
    }, message)

  }

  response.record({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/record`,
    method: 'POST',
    finishOnKey: '#',
    trim: 'trim-silence'
  })

  return {
    twiml: response.toString()
  }

}

export default voicemail
