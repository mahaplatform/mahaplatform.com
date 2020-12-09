import socket from '@core/vendor/emitter'
import { twiml } from 'twilio'

const recordRoute = async (req, res) => {

  await socket.in(`/admin/crm/recordings/${req.params.code}`).emit('message', {
    target: `/admin/crm/recordings/${req.params.code}`,
    action: 'status',
    data: {
      status: 'recording'
    }
  })

  const response = new twiml.VoiceResponse()

  response.say('Please record your message after the beep. Press the pound key when finished')

  response.record({
    action: `${process.env.TWIML_HOST}/voice/crm/recordings/${req.params.code}/review`,
    finishOnKey: '#',
    trim: 'trim-silence'
  })

  return res.status(200).type('text/xml').send(response.toString())

}

export default recordRoute
