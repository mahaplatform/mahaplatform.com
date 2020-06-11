import { twiml } from 'twilio'
import ejs from 'ejs'

const voicemail = async (req, { config, enrollment, step, recording, tokens }) => {

  if(recording) {
    return {
      recording_data: recording
    }
  }

  await enrollment.related('call').save({
    was_answered: false
  }, {
    transacting: req.trx
  })

  const { message, strategy, voice } = config

  const response = new twiml.VoiceResponse()

  if(strategy === 'play') {

    response.play({
      loop: 1
    }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${step.get('code')}/recording`)

  } else if(strategy === 'say') {

    const rendered = ejs.render(message, tokens)

    response.say({
      voice
    }, rendered)

  }

  response.record({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/voicemail`,
    method: 'POST',
    finishOnKey: '#',
    trim: 'trim-silence'
  })

  return {
    twiml: response.toString()
  }

}

export default voicemail
