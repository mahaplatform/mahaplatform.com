const { voiceurl } = require('./utils')
const play = require('./play')
const say = require('./say')

const dial = (req, twiml) => {
  const { body, query, step } = req
  const { index, state } = query
  const extension = step.extensions[index]
  if(extension.say) say({ step: extension.say }, twiml, true)
  if(extension.play) play({ step: extension.play }, twiml, true)
  const dial = twiml.dial({
    callerId: body.To,
    timeout: 15
  })
  extension.recipients.map(recipient => {
    if(recipient.client) dial.client(recipient.client)
    if(recipient.number) dial.number(recipient.number)
  })
  twiml.redirect(voiceurl(req, '/voice', { state: `${state}.noanswer.steps.0` }))
}

const processAnswer = (req, twiml) => {
  const { body, query, step } = req
  const { star, hash, extensions } = step
  const { state } = query
  if(star && body.Digits === '*') {
    twiml.redirect(voiceurl(req, '/voice', { state: `${state}.star.steps.0` }))
    return 'pressed star'
  }
  if(hash && body.Digits === '#') {
    twiml.redirect(voiceurl(req, '/voice', { state: `${state}.hash.steps.0` }))
    return 'pressed hash'
  }
  const index = extensions.findIndex(extension => {
    return extension.extension === body.Digits
  })
  if(index >= 0) {
    twiml.redirect(voiceurl(req, '/voice', { state, action: 'dial', index }))
    return 'found'
  } else {
    twiml.say('I couldnt find anyone with that extension')
    twiml.redirect(voiceurl(req, '/voice', { action: 'ask' }))
    return 'not found'
  }
}

const answer = (req, twiml) => {
  const response = processAnswer(req, twiml)
  return {
    verb: 'dialbyextension',
    action: 'answer',
    response
  }
}

const ask = (req, twiml) => {
  const { state } = req.query
  const gather = twiml.gather({
    action: voiceurl(req, '/voice', { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: req.step.extensions.reduce((digits, extension) => {
      return Math.max(digits, extension.extension.length)
    }, 0),
    timeout: 3
  })
  if(req.step.say) say({ step: req.step.say }, gather, true)
  if(req.step.play) play({ step: req.step.play }, gather, true)
  twiml.redirect(voiceurl(req, '/voice', { state: `${state}.noanswer.steps.0` }))
  return {
    verb: 'dialbyextension',
    action: 'ask'
  }
}

const getAction = (action) => {
  if(action === 'answer') return answer
  if(action === 'dial') return dial
  return ask
}

const dialbyextension = (req, twiml) => {
  const action = getAction(req.query.action)
  return action(req, twiml)
}

module.exports = dialbyextension
