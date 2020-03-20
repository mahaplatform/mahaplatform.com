import redis from '../../../../../core/services/redis'
import { twiml } from 'twilio'

const requestRecording = async (req, { enrollment, step, config }) => {

  const { message, strategy, voice } = config

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

const reviewRecording = async (req, { enrollment, step, recording }) => {

  const data = JSON.stringify({ recording })

  await redis.setAsync(`recording:${enrollment.get('code')}:${step.get('code')}`, data, 'EX', 60 * 5)

  const response = new twiml.VoiceResponse()

  const gather = response.gather({
    action: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}/gather`,
    method: 'POST',
    numDigits: 1,
    timeout: 30
  })

  gather.say('You said')

  gather.play(recording)

  gather.say('Press 1 to keep this recording, 2 to record again')

  return {
    twiml: response.toString()
  }

}

const saveRecording = async (req, { enrollment, step, recording }) => ({
  recording_url: recording
})

const confirmRecording = async (req, { enrollment, step }) => {

  const data = await redis.getAsync(`recording:${enrollment.get('code')}:${step.get('code')}`)

  const { recording } = JSON.parse(data)

  return {
    recording_url: recording
  }

}

const redoRecording = async (req, { enrollment, step }) => {

  const response = new twiml.VoiceResponse()

  response.redirect({
    method: 'POST'
  }, `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}/${step.get('code')}`)

  return {
    twiml: response.toString()
  }

}


const message = async (req, params) => {

  const { answer, config, enrollment, step, recording } = params

  const { confirm } = config

  if(recording && confirm === 'yes') {
    return await reviewRecording(req, {
      enrollment,
      step,
      recording
    })
  }

  if(recording && confirm === 'no') {
    return await saveRecording(req, {
      enrollment,
      step,
      recording
    })
  }

  if(answer === '1') {
    return await confirmRecording(req, {
      enrollment,
      step
    })
  }

  if(answer === '2') {
    return await redoRecording(req, {
      enrollment,
      step
    })
  }

  return await requestRecording(req, {
    enrollment,
    step,
    config
  })

}

export default message
