const rp = require('request-promise')
const _ = require('lodash')

const fetchConfig = async (direction, number) => {
  const result = await rp(`http://twiml.mahaplatform.com/${direction}/${number}.json`)
  return JSON.parse(result)
}

const getNext = (code, config, state) => {
  const parts = state.split('.')
  const next = state.split('.').reverse().reduce((newstate, part, index) => {
    if(newstate !== null) return newstate
    if(!/^\d$/.test(part)) return newstate
    if(parts[parts.length - index - 2] !== 'steps') return newstate
    const next = parts.slice(0, parts.length - index)
    next[next.length - 1] = parseInt(next[next.length - 1]) + 1
    const candidate = next.join('.')
    return _.get(config, candidate) !== undefined ? candidate : null
  }, null)
  return `/call?code=${code}&state=${next}`
}

const say = ({ code, config, step, state, twiml }) => {
  twiml.say(step.text)
  twiml.redirect(getNext(code, config, state))
}

const play = ({ code, config, step, state, twiml }) => {
  twiml.play(step.url)
  twiml.redirect(getNext(code, config, state))
}

const gather = ({ action, answer, code, step, state, twiml }) => {
  if(action === 'answer') {
    const selected = _.findIndex(step.answers, { answer })
    twiml.redirect(`/call?code=${code}&state=${state}.answers.${selected}.steps.0`)
  } else {
    const gather = twiml.gather({
      action: `/call?code=${code}&state=${state}&action=answer`,
      finishOnKey: '',
      numDigits: 1
    })
    if(step.say) gather.say(step.say)
    if(step.play) gather.say(step.play)
    if(step.noanswer) twiml.redirect(`/call?code=${code}&state=${state}.noanswer.steps.0`)
  }
}

const hangup = ({ twiml }) => {
  twiml.hangup()
}

const execute = (params) => {
  if(params.step.verb === 'say') return say(params)
  if(params.step.verb === 'play') return play(params)
  if(params.step.verb === 'gather') return gather(params)
  if(params.step.verb === 'hangup') return hangup(params)
}

const generateCode = () => {
  return _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
}

exports.handler = async (context, event, callback) => {

  const direction = event.Direction

  const to = event.To.substr(1)

  const state = event.state || 'steps.0'

  const config = await fetchConfig(direction, to)

  const twiml = new Twilio.twiml.VoiceResponse()

  console.log(event)

  execute({
    action: event.action,
    answer: event.Digits,
    config,
    code: event.code || generateCode(),
    step: _.get(config, state),
    state,
    twiml
  })

  return callback(null, twiml)

}
