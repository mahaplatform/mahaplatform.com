const Twilio = require('twilio')
const _ = require('lodash')
const qs = require('qs')

const url = (call, params) => {
  const { req } = call
  const { enrollment, workflow } = req.query
  params.enrollment = enrollment
  if(workflow) params.workflow = workflow
  return `/call?${qs.stringify(params)}`
}

const next = (twiml, call) => {
  const { config, req } = call
  const { state } = req.query
  const parts = state.split('.')
  const nextstate = state.split('.').reverse().reduce((newstate, part, index) => {
    if(newstate !== null) return newstate
    if(!/^\d$/.test(part)) return newstate
    if(parts[parts.length - index - 2] !== 'steps') return newstate
    const next = parts.slice(0, parts.length - index)
    next[next.length - 1] = parseInt(next[next.length - 1]) + 1
    const candidate = next.join('.')
    return _.get(config, candidate) !== undefined ? candidate : null
  }, null)
  if(nextstate) return twiml.redirect(url(call, { state: nextstate }))
  return twiml.hangup()
}

const say = (twiml, call, step) => {
  twiml.say({
    voice: step.voice || 'woman',
    loop: step.loop || 1
  }, step.text)
  next(twiml, call)
}

const dial = (twiml, call, step) => {
  const dial = twiml.dial({
    timeout: 15
  })
  step.numbers.map(number => {
    dial.number({}, number)
  })
}

const play = (twiml, call, step) => {
  twiml.play({
    loop: step.loop || 1
  }, step.url)
  next(twiml, call)
}

const gather = (twiml, call, step) => {
  const { req, query } = call
  const { state } = req.query
  if(query.action === 'answer') {
    const answer = req.body.Digits
    const selected = _.findIndex(step.answers, { answer })
    twiml.redirect(url(call, { state: `${state}.answers.${selected}.steps.0` }))
  } else {
    const gather = twiml.gather({
      action: url(call, { state, action: 'answer' }),
      finishOnKey: '',
      numDigits: 1
    })
    if(step.say) gather.say(step.say)
    if(step.play) gather.say(step.play)
    if(step.noanswer) twiml.redirect(url(call, { state: `${state}.noanswer.steps.0` }))
  }
}

const hangup = (twiml, call, step) => {
  twiml.hangup()
}

const executeStep = (call) => {
  const { config, req } = call
  const twiml = new Twilio.twiml.VoiceResponse()
  const step = _.get(config, req.query.state) || {}
  if(step.verb === 'dial') dial(twiml, call, step)
  if(step.verb === 'play') play(twiml, call, step)
  if(step.verb === 'gather') gather(twiml, call, step)
  if(step.verb === 'hangup') hangup(twiml, call, step)
  if(step.verb === 'say') say(twiml, call, step)
  if(!step.verb) hangup(twiml, call, step)
  return twiml
}

exports.executeStep = executeStep
