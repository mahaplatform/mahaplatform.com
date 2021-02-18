import { getUrl, performAsk } from '../../utils'

const ask = (req, { config, state, step, twiml }) => {

  const ask = performAsk(req, { config, state, step, twiml })

  twiml.record({
    action: getUrl(req, { state, action: 'complete' }),
    trim: 'trim-silence',
    finishOnKey: '#',
    recordingStatusCallback: `${process.env.TWILIO_HOST_STATUS}/voice/status`
  })

  return {
    action: {
      data: {
        action: 'ask',
        ...ask.action.data
      }
    },
    twiml
  }

}

export default ask
