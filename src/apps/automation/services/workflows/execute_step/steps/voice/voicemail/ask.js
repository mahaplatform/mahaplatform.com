import { getUrl, performAsk } from '../../utils'

const ask = (req, { config, state, step, twiml }) => {

  const ask = performAsk(req, { config, state, step: step.config, twiml })

  twiml.record({
    action: getUrl(req, { state, action: 'complete' }),
    trim: 'trim-silence',
    finishOnKey: '#'
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
