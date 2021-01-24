const _ = require('lodash')
const qs = require('qs')

const url = (call, params) => {
  const { req } = call
  const { enrollment, workflow } = req.query
  params.enrollment = enrollment
  if(workflow) params.workflow = workflow
  return `/sms?${qs.stringify(params)}`
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
}

exports.url = url
exports.next = next
