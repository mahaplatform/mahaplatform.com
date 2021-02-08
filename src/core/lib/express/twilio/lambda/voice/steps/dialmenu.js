const { voiceurl } = require('./utils')
const play = require('./play')
const say = require('./say')

const processAnswer = (req, twiml) => {
  const { body, query, step } = req
  const { star, hash, options } = step
  const { state } = query
  if(star && body.Digits === '*') {
    twiml.redirect(voiceurl(req, '/voice', { state: `${state}.star.steps.0` }))
    return 'pressed star'
  }
  if(hash && body.Digits === '#') {
    twiml.redirect(voiceurl(req, '/voice', { state: `${state}.hash.steps.0` }))
    return 'pressed hash'
  }
  const index = options.findIndex(option => {
    return option.number === body.Digits
  })
  if(index >= 0) {
    twiml.redirect(voiceurl(req, '/voice', { state: `${state}.options.${index}.steps.0` }))
    return 'found'
  } else {
    twiml.say('That is not a valid selection')
    twiml.redirect(voiceurl(req, '/voice', { action: 'ask' }))
    return 'not found'
  }
}

const answer = (req, twiml) => {
  const response = processAnswer(req, twiml)
  return {
    verb: 'dialmenu',
    action: 'answer',
    response
  }
}

const ask = (req, twiml) => {
  const { state } = req.query
  const gather = twiml.gather({
    action: voiceurl(req, '/voice', { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: req.step.options.reduce((digits, option) => {
      return Math.max(digits, option.number.length)
    }, 0),
    timeout: 3
  })
  if(req.step.say) say({ step: req.step.say }, gather, true)
  if(req.step.play) play({ step: req.step.play }, gather, true)
  twiml.redirect(voiceurl(req, '/voice', { state: `${state}.noinput.steps.0` }))
  return {
    verb: 'dialmenu',
    action: 'ask'
  }
}

const getAction = (action) => {
  if(action === 'answer') return answer
  return ask
}

const dialmenu = (req, twiml) => {
  const action = getAction(req.query.action)
  return action(req, twiml)
}

module.exports = dialmenu
