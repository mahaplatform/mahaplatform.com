import { getUrl, performAsk } from '../../utils'
import forward from './forward'

const announce = (req, { config, state, step, twiml }) => {

  const extension = step.extensions[req.query.index]

  const announce = performAsk(req, { config, state, step: { config: extension }, twiml })

  if(!announce) return forward(req, { config, state, step, twiml })

  twiml.redirect(getUrl(req, { state, action: 'forward', index: req.query.index }))

  return {
    action: {
      data: {
        action: 'announce',
        ...announce.action.data
      }
    },
    twiml
  }

}

module.exports = announce
