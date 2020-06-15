import { twiml } from 'twilio'
import ejs from 'ejs'

const voicemail = async (req, params) => {

  const { config, enrollment, execute, step, recording, tokens } = params

  if(recording) {
    return {
      recording_data: recording
    }
  }

  if(execute) return {}

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

  response.redirect(`${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/next`)

  return {
    twiml: response.toString()
  }

}

export default voicemail
