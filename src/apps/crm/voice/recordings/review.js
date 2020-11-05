import socket from '@core/services/emitter'
import redis from '@core/services/redis'
import { twiml } from 'twilio'

const reviewRoute = async (req, res) => {

  await socket.in(`/admin/crm/recordings/${req.params.code}`).emit('message', {
    target: `/admin/crm/recordings/${req.params.code}`,
    action: 'status',
    data: {
      status: 'reviewing'
    }
  })

  const data = await redis.getAsync(`recording:${req.params.code}`)

  const newdata = JSON.stringify({
    ...JSON.parse(data),
    url: req.body.RecordingUrl
  })

  await redis.setAsync(`recording:${req.params.code}`, newdata, 'EX', 60 * 5)

  const response = new twiml.VoiceResponse()

  const gather = response.gather({
    input: 'dtmf',
    action: `${process.env.TWIML_HOST}/voice/crm/recordings/${req.params.code}`,
    method: 'POST',
    numDigits: 1,
    timeout: 5
  })

  gather.say('You said')

  gather.play(req.body.RecordingUrl)

  gather.say('Press 1 to keep this recording, 2 to record again')

  return res.status(200).type('text/xml').send(response.toString())

}

export default reviewRoute
