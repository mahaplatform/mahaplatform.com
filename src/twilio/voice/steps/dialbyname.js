const { getMatchingUsers, url } = require('./utils')

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

const choose = (req, twiml) => {
  const { body, query, step } = req
  const { state } = query
  const users = getMatchingUsers(query.digits, step.users)
  const index = parseInt(body.Digits) - 1
  const user = users[index]
  if(user) {
    twiml.redirect(url(req, { state, action: 'dial', index: user.index }))
  } else {
    twiml.say(`${body.Digits} is not a valid response`)
    twiml.redirect(url(req, { state, action: 'answer', digits: query.digits }))
  }
}

const processAnswer = (req, twiml) => {
  const { body, query, step } = req
  const { state } = query
  const digits = req.query.digits || body.Digits
  const users = getMatchingUsers(digits, step.users)
  const names = users.map(user => `${user.first_name} ${user.last_name}`)
  if(users.length > 1) {
    const gather = twiml.gather({
      action: url(req, { state, action: 'choose', digits }),
      finishOnKey: '',
      numDigits: 1,
      timeout: 10
    })
    names.map((names, index) => {
      gather.say(`Press ${index + 1} for ${names}`)
      gather.pause({ length: 1 })
    })
    return 'multiple users'
  } else if(users.length === 1) {
    twiml.redirect(url(req, { state, action: 'dial', index: users[0].index }))
    return 'found'
  } else {
    twiml.say('I couldnt find anyone who matches that input')
    twiml.redirect(url(req, { action: 'ask' }))
    return 'not found'
  }
}

const answer = (req, twiml) => {
  const response = processAnswer(req, twiml)
  return {
    verb: 'dialbyname',
    action: 'answer',
    response
  }
}

const ask = (req, twiml) => {
  const { state } = req.query
  const gather = twiml.gather({
    action: url(req, { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: 3,
    timeout: 10
  })
  gather.say('Please dial the first three letters of the person\'s last name')
  twiml.redirect(url(req, { action: 'answer' }))
  return {
    verb: 'dialbyname',
    action: 'ask'
  }
}

const getAction = (action) => {
  if(action === 'answer') return answer
  if(action === 'choose') return choose
  if(action === 'dial') return dial
  return ask
}

const dialbyname = (req, twiml) => {
  const action = getAction(req.query.action)
  return action(req, twiml)
}

module.exports = dialbyname
