import { getNext, getUrl } from '../utils'
import play from './play'
import say from './say'

const performAsk = (req, { config, state, step, twiml }) => {
  if(step.config.say) return say(req, { config, state, step: step, twiml }, true)
  if(step.config.play) return play(req, { config, state, step: step, twiml }, true)
}

const ask = (req, { config, state, step, twiml }) => {
  const ask = performAsk(req, { config, state, step, twiml })
  twiml.record({
    action: getUrl(req, '/voice', { state, action: 'complete' }),
    trim: 'trim-silence',
    finishOnKey: '#'
  })

  return {
    action: {
      action: 'ask',
      ask
    },
    twiml
  }
}

const complete = (req, { config, state, step, twiml }) => ({
  action: {
    action: 'complete',
    sid: req.body.RecordingSid
  },
  next: getNext(req, { config, state }),
  twiml
})

const voicemailStep = (req, { config, state, step, twiml }) => {
  const verb = req.query.action === 'complete' ? complete : ask
  return verb(req, { config, state, step, twiml })
}

export default voicemailStep
