const { url } = require('./utils')
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
  const gather = twiml.gather({
    action: url(req, '/voice', { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: 1
  })
  const ask = performAsk(req, gather)
  if(req.step.noanswer) twiml.redirect(url(req, '/voice', { state: `${state}.noanswer.steps.0` }))
  return {
    verb: 'gather',
    action: 'ask',
    ask
  }
}

const answer = (req, twiml) => {
  const { config } = req
  const { state } = req.query
  const index = _.findIndex(req.step.answers, { answer: req.body.Digits })
  const answer = _.get(config, `${state}.answers.${index}`)
  twiml.redirect(url(req, '/voice', { state: `${state}.answers.${index}.steps.0` }))
  return {
    verb: 'gather',
    action: 'answer',
    answer: req.body.Digits
  }
}

const gather = (req, twiml) => {
  const verb = req.query.action === 'answer' ? answer : ask
  return verb(req, twiml)
}

module.exports = gather
