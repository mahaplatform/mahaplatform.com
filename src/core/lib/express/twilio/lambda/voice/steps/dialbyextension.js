const { speakNumber, voiceurl } = require('./utils')
const play = require('./play')
const say = require('./say')
const _ = require('lodash')

const dial = (req, twiml) => {
  const { query, step } = req
  const { index } = query
  const user = step.users[index]
  twiml.say(`Connecting you to ${user.first_name} ${user.last_name}`)
  const dial = twiml.dial({
    timeout: 15
  })
  if(user.client) dial.client(user.client)
  if(user.number) dial.number(user.number)
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
  console.log('here')
  const { state } = req.query
  const attempt = req.query.attempt ? parseInt(req.query.attempt) : 1
  const gather = twiml.gather({
    action: voiceurl(req, '/voice', { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: req.step.extensions.reduce((digits, extension) => {
      return Math.max(digits, extension.extension.length)
    }, 0),
    timeout: 5
  })
  if(attempt === 1) {
    if(req.step.say) say({ step: req.step.say }, gather, true)
    if(req.step.play) play({ step: req.step.play }, gather, true)
    if(req.step.say || req.step.play) gather.pause({ length: 1 })
  }
  req.step.extensions.map(extension => {
    if(extension.say) say({ step: extension.say }, gather, true)
    if(extension.play) play({ step: extension.play }, gather, true)
    if(extension.say || extension.play) gather.pause({ length: 1 })
  })
  if(attempt < 3) {
    twiml.say('I didnt receive any input')
    twiml.redirect(voiceurl(req, '/voice', { action: 'ask', attempt: attempt + 1 }))
  } else {
    twiml.hangup()
  }
  return {
    verb: 'dialbyextension',
    action: 'ask',
    attempt
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
