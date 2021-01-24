const { next, url } = require('./utils')
const { play } = require('./play')
const { say } = require('./say')
const _ = require('lodash')

const performAsk = (gather, call, step) => {
  if(step.say) return say(gather, call, step.say, true)
  if(step.play) return play(gather, call, step.play, true)
}

const ask = (twiml, call, step) => {
  const { req } = call
  const { state } = req.query
  const ask = performAsk(twiml, call, step)
  const record = twiml.record({
    action: url(call, { state, action: 'review' }),
    finishOnKey: '#',
    trim: 'trim-silence'
  })
  return {
    verb: 'record',
    action: 'ask',
    ask
  }
}

const review = (twiml, call, step) => {
  const { body, query } = call.req
  const { state } = query
  const recording = body.RecordingUrl
  const duration = parseInt(body.RecordingDuration)
  const sid = body.RecordingSid
  const gather = twiml.gather({
     action: url(call, { state, action: 'confirm', sid }),
     numDigits: 1,
     timeout: duration + 5
   })
   gather.say('You said')
   gather.play(recording)
   gather.say('Press 1 to keep this recording, 2 to record again')
   return {
     verb: 'record',
     action: 'review',
     ask,
     sid
   }
}

const confirm = (twiml, call, step) => {
  const { config, req } = call
  const { state, sid } = req.query
  if(req.body.Digits === '1') {
    next(twiml, call)
  }
  if(req.body.Digits === '2') {
    twiml.redirect(url(call, { state, action: 'ask' }))
  }
  return {
    verb: 'record',
    action: 'confirm',
    confirmed: req.body.Digits === '1',
    sid
  }
}

const answer = (twiml, call, step) => {
  const { config, req } = call
  const { state } = req.query
  const index = _.findIndex(step.answers, { answer: req.body.Digits })
  const answer = _.get(config, `${state}.answers.${index}`)
  twiml.redirect(url(call, { state: `${state}.answers.${index}.steps.0` }))
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

const record = (twiml, call, step) => {
  const { req } = call
  console.log(req)
  const action = getAction(req.query.action)
  return action(twiml, call, step)
}

exports.record = record
