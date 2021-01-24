const { url } = require('./utils')
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
  const gather = twiml.gather({
    action: url(call, { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: 1
  })
  const ask = performAsk(gather, call, step)
  if(step.noanswer) twiml.redirect(url(call, { state: `${state}.noanswer.steps.0` }))
  return {
    verb: 'gather',
    action: 'ask',
    ask
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

const gather = (twiml, call, step) => {
  const { req } = call
  const verb = req.query.action === 'answer' ? answer : ask
  return verb(twiml, call, step)
}

exports.gather = gather
