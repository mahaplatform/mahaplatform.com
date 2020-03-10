import { twiml } from 'twilio'

const showRoute = async (req, res) => {

  const response = new twiml.VoiceResponse()

  response.say('Hi Greg. Please record your message after the beep. Hangup or press the pound key when finished.')

  response.record({
    finishOnKey: '#',
    trim: 'trim-silence',
    recordingStatusCallbackMethod: 'POST',
    recordingStatusCallback: `${process.env.TWIML_HOST}/api/admin/crm/recordings/${req.params.code}`,
    recordingStatusCallbackEvent: 'completed'
  })

  response.hangup()

  return res.status(200).type('text/xml').send(response.toString())

}

export default showRoute
