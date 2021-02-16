import { getUrl } from '../../utils'

const processAnswer = (req, { state, step, twiml }) => {

  const { star, hash, options } = step

  if(star && req.body.Digits === '*') {
    twiml.redirect(getUrl(req, { state: `${state}.star.steps.0` }))
    return 'pressed star'
  }

  if(hash && req.body.Digits === '#') {
    twiml.redirect(getUrl(req, { state: `${state}.hash.steps.0` }))
    return 'pressed hash'
  }

  const index = options.findIndex(option => {
    return option.number === req.body.Digits
  })

  if(index >= 0) {
    twiml.redirect(getUrl(req, { state: `${state}.options.${index}.steps.0` }))
    return `pressed ${req.body.Digits}`
  }

  twiml.say('That is not a valid selection')

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
