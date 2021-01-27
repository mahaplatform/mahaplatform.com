const { speakNumber, url } = require('./utils')

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
  const { state } = query
  const index = step.users.findIndex(user => {
    return user.extension === body.Digits
  })
  if(index >= 0) {
    twiml.redirect(url(req, { state, action: 'dial', index }))
    return 'found'
  } else {
    twiml.say('I couldnt find anyone with that extension')
    twiml.redirect(url(req, { action: 'ask' }))
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
  const attempt = req.query.attempt ? parseInt(req.query.attempt) : 1
  const gather = twiml.gather({
    action: url(req, { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: 3,
    timeout: 5
  })
  if(attempt === 1) {
    gather.say('You may dial your party\'s extension at any time')
    gather.pause({ length: 1 })
  }
  req.step.users.map(user => {
    gather.say(`Dial ${speakNumber(user.extension)} for ${user.first_name} ${user.last_name}`)
    gather.pause({ length: 1 })
  })
  if(attempt < 3) {
    twiml.say('I didnt receive any input')
    twiml.redirect(url(req, { action: 'ask', attempt: attempt + 1 }))
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
