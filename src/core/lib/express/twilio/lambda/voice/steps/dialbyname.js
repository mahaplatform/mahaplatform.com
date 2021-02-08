const { getMatchingUsers, voiceurl } = require('./utils')
const play = require('./play')
const say = require('./say')

const dial = (req, twiml) => {
  const { body, query, step } = req
  const { index, state } = query
  const recipient = step.recipients[index]
  if(recipient.say) say({ step: recipient.say }, twiml, true)
  if(recipient.play) play({ step: recipient.play }, twiml, true)
  const dial = twiml.dial({
    callerId: body.To,
    timeout: 15
  })
  if(recipient.client) dial.client(recipient.client)
  if(recipient.number) dial.number(recipient.number)
  twiml.redirect(voiceurl(req, '/voice', { state: `${state}.noanswer.steps.0` }))
}

const choose = (req, twiml) => {
  const { body, query, step } = req
  const { state } = query
  const recipients = getMatchingUsers(query.digits, step.recipients)
  const index = parseInt(body.Digits) - 1
  const recipient = recipients[index]
  if(recipient) {
    twiml.redirect(voiceurl(req, '/voice', { state, action: 'dial', index: recipient.index }))
  } else {
    twiml.say(`${body.Digits} is not a valid response`)
    twiml.redirect(voiceurl(req, '/voice', { state, action: 'answer', digits: query.digits }))
  }
}

const processAnswer = (req, twiml) => {
  const { body, query, step } = req
  const { star, hash } = step
  const { state } = query
  if(star && body.Digits === '*') {
    twiml.redirect(voiceurl(req, '/voice', { state: `${state}.star.steps.0` }))
    return 'pressed star'
  }
  if(hash && body.Digits === '#') {
    twiml.redirect(voiceurl(req, '/voice', { state: `${state}.hash.steps.0` }))
    return 'pressed hash'
  }
  const digits = req.query.digits || body.Digits
  const recipients = getMatchingUsers(digits, step.recipients)
  const names = recipients.map(recipient => `${recipient.first_name} ${recipient.last_name}`)
  if(recipients.length > 1) {
    const gather = twiml.gather({
      action: voiceurl(req, '/voice', { state, action: 'choose', digits }),
      finishOnKey: '',
      numDigits: 1,
      timeout: 3
    })
    names.map((names, index) => {
      gather.say(`Press ${index + 1} for ${names}`)
      gather.pause({ length: 1 })
    })
    return 'multiple users'
  } else if(recipients.length === 1) {
    twiml.redirect(voiceurl(req, '/voice', { state, action: 'dial', index: recipients[0].index }))
    return 'found'
  } else {
    twiml.say('I couldnt find anyone who matches that input')
    twiml.redirect(voiceurl(req, '/voice', { action: 'ask' }))
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
    action: voiceurl(req, '/voice', { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: 3,
    timeout: 3
  })
  if(req.step.say) say({ step: req.step.say }, gather, true)
  if(req.step.play) play({ step: req.step.play }, gather, true)
  twiml.redirect(voiceurl(req, '/voice', { state: `${state}.noinput.steps.0` }))
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
