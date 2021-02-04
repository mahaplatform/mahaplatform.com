const { speakNumber, url } = require('./utils')
const play = require('./play')
const say = require('./say')

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
  const { extensions } = step
  const { state } = query
  const index = extensions.findIndex(extension => {
    return user.extension === body.Digits
  })
  if(index >= 0) {
    twiml.redirect(url(req, '/voice', { state, action: 'dial', index }))
    return 'found'
  } else {
    twiml.say('I couldnt find anyone with that extension')
    twiml.redirect(url(req, '/voice', { action: 'ask' }))
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
  const { extensions, strategy, voice, text, recording_id } = req.step
  const { state } = req.query
  const attempt = req.query.attempt ? parseInt(req.query.attempt) : 1
  const gather = twiml.gather({
    action: url(req, '/voice', { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: 3,
    timeout: 5
  })
  if(attempt === 1) {
    if(strategy === 'say') say({ step: { voice, text } }, gather, true)
    if(strategy === 'play') play({ step: { loop: 1, recording_id } }, gather, true)
    gather.pause({ length: 1 })
  }
  extensions.map(extension => {
    const { strategy, voice, text, recording_id } = extension
    if(strategy === 'say') say({ step: { voice, text } }, gather, true)
    if(strategy === 'play') play({ step: { loop: 1, recording_id } }, gather, true)
    gather.pause({ length: 1 })
  })
  if(attempt < 3) {
    twiml.say('I didnt receive any input')
    twiml.redirect(url(req, '/voice', { action: 'ask', attempt: attempt + 1 }))
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
