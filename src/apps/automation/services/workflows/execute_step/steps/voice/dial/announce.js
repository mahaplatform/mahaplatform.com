import { getUrl, performAsk } from '../../utils'
import forward from './forward'

const announce = (req, { config, state, step, twiml }) => {

  const announce = performAsk(req, { config, state, step, twiml })

  if(!announce) return forward(req, { step, twiml })

  twiml.redirect(getUrl(req, { state, action: 'forward' }))

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
