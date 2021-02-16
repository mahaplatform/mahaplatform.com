import { getUrl, performAsk } from '../../utils'
import forward from './forward'

const announce = async (req, { config, state, step, twiml }) => {

  const recipient = step.recipients[req.query.index]

  const announce = performAsk(req, { config, state, step: recipient, twiml })

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
