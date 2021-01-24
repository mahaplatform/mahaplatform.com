const _ = require('lodash')
const qs = require('qs')

const url = (call, params) => {
  const { enrollment, query } = call
  const { workflow } = query
  params.enrollment = enrollment
  if(workflow) params.workflow = workflow
  return `/call?${qs.stringify(params)}`
}

const next = (call) => {
  const { config, state, twiml } = call
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

const say = (call) => {
  const { step, twiml } = call
  twiml.say(step.text)
  next(call)
}

const dial = (call) => {
  const { step, twiml } = call
  const dial = twiml.dial({
    timeout: 15
  })
  step.numbers.map(number => {
    dial.number({}, number)
  })
}

const play = (call) => {
  const { step, twiml } = call
  twiml.play(step.url)
  next(call)
}

const gather = (call) => {
  const { body, query, step, state, twiml } = call
  if(query.action === 'answer') {
    const answer = body.Digits
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

const hangup = (call) => {
  const { twiml } = call
  twiml.hangup()
}

const executeStep = (call) => {
  const { step } = call
  if(!step) return hangup(call)
  if(step.verb === 'dial') return dial(call)
  if(step.verb === 'play') return play(call)
  if(step.verb === 'gather') return gather(call)
  if(step.verb === 'hangup') return hangup(call)
  if(step.verb === 'say') return say(call)
}

exports.executeStep = executeStep
