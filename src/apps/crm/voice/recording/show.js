import { twiml } from 'twilio'

const record = async (req, res) => {

  const response = new twiml.VoiceResponse()

  response.say('Hello. Please leave a message after the beep.')

  response.record({
    recordingStatusCallbackMethod: 'POST',
    recordingStatusCallback: '/voice/crm/recording'
  })

  response.hangup()

  return res.status(200).type('text/xml').send(response.toString())

}

export default record
