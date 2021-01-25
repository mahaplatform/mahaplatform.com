const { url } = require('./utils')
const play = require('./play')
const say = require('./say')
const _ = require('lodash')

const performAsk = (req, res, gather) => {
  const { step } = req
  if(step.say) return say({ step: step.say }, res, gather, true)
  if(step.play) return play({ step: step.play }, res, gather, true)
}

const ask = (req, res, twiml) => {
  const { state } = req.query
  const gather = twiml.gather({
    action: url(req, { state, action: 'answer' }),
    finishOnKey: '',
    numDigits: 1
  })
  const ask = performAsk(req, res, gather)
  if(req.step.noanswer) twiml.redirect(url(req, { state: `${state}.noanswer.steps.0` }))
  return {
    verb: 'gather',
    action: 'ask',
    ask
  }
}

const answer = (req, res, twiml) => {
  const { config } = req
  const { state } = req.query
  const index = _.findIndex(req.step.answers, { answer: req.body.Digits })
  const answer = _.get(config, `${state}.answers.${index}`)
  twiml.redirect(url(call, { state: `${state}.answers.${index}.steps.0` }))
  return {
    verb: 'gather',
    action: 'answer',
    answer: req.body.Digits
  }
}

const gather = (req, res, twiml) => {
  const verb = req.query.action === 'answer' ? answer : ask
  return verb(req, res, twiml)
}

module.exports = gather
