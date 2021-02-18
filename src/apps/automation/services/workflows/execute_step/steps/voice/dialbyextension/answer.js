import { getUrl } from '../../utils'

const processAnswer = (req, { config, enrollment, state, step, twiml }) => {

  const { star, hash, extensions } = step.config

  if(star && req.body.Digits === '*') {
    twiml.redirect(getUrl(req, { state: `${state}.star.steps.0` }))
    return 'pressed star'
  }

  if(hash && req.body.Digits === '#') {
    twiml.redirect(getUrl(req, { state: `${state}.hash.steps.0` }))
    return 'pressed hash'
  }

  const index = extensions.findIndex(extensions => {
    return extensions.extension === req.body.Digits
  })

  if(index >= 0) {
    twiml.redirect(getUrl(req, { state, action: 'announce', index }))
    return `pressed ${req.body.Digits}`
  }

  twiml.say('I couldnt find anyone with that extension')

  twiml.redirect(getUrl(req, { action: 'ask' }))

  return 'not found'

}

const answer = (req, { config, enrollment, state, step, twiml }) => {

  const response = processAnswer(req, { config, enrollment, state, step, twiml })

  return {
    action: {
      data: {
        action: 'answer',
        response
      }
    },
    twiml
  }

}

export default answer
