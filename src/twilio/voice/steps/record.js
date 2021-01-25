const { next, url } = require('./utils')
const play = require('./play')
const say = require('./say')
const _ = require('lodash')

const performAsk = (req, gather) => {
  const { step } = req
  if(step.say) return say({ step: step.say }, gather, true)
  if(step.play) return play({ step: step.play }, gather, true)
}

const ask = (req, twiml) => {
  const { state } = req.query
  const ask = performAsk(req, twiml)
  const record = twiml.record({
    action: url(req, { state, action: 'review' }),
    finishOnKey: '#',
    trim: 'trim-silence'
  })
  return {
    verb: 'record',
    action: 'ask',
    ask
  }
}

const review = (req, twiml) => {
  const { body, query } = req
  const { state } = query
  const recording = body.RecordingUrl
  const duration = parseInt(body.RecordingDuration)
  const sid = body.RecordingSid
  const gather = twiml.gather({
     action: url(req, { state, action: 'confirm', sid }),
     numDigits: 1,
     timeout: duration + 5
   })
   gather.say('You said')
   gather.play(recording)
   gather.say('Press 1 to keep this recording, 2 to record again')
   twiml.redirect(url(req, { state, action: 'confirm', timeout: true, sid }))
   return {
     verb: 'record',
     action: 'review',
     ask,
     sid
   }
}

const processResponse = (req, twiml) => {
  const { body, query } = req
  const { state } = query
  if(query.timeout) {
    next(req, twiml)
    return 'timout'
  } else if(body.Digits === '1') {
    next(req, twiml)
    return 'confirmed'
  } else if(body.Digits === '2') {
    twiml.redirect(url(req, { state, action: 'ask' }))
    return 'rejected'
  }
}

const confirm = (req, twiml) => {
  const { sid } = req.query
  const response = processResponse(req, twiml)
  return {
    verb: 'record',
    action: 'confirm',
    response,
    sid
  }
}

const answer = (req, twiml) => {
  const { state } = req.query
  const index = _.findIndex(req.step.answers, { answer: req.body.Digits })
  const answer = _.get(req.config, `${state}.answers.${index}`)
  twiml.redirect(url(req, { state: `${state}.answers.${index}.steps.0` }))
  return {
    verb: 'gather',
    action: 'answer',
    answer: req.body.Digits
  }
}

const getAction = (action) => {
  if(action === 'review') return review
  if(action === 'confirm') return confirm
  return ask
}

const record = (req, twiml) => {
  const action = getAction(req.query.action)
  return action(req, twiml)
}

module.exports = record
