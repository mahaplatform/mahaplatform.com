const _ = require('lodash')
const qs = require('qs')

const url = (req, params) => {
  const { enrollment, workflow } = req.query
  params.enrollment = enrollment
  if(workflow) params.workflow = workflow
  return `/call?${qs.stringify(params)}`
}

const next = (req, twiml) => {
  const { config } = req
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

  if(nextstate) return twiml.redirect(url(req, { state: nextstate }))
  return twiml.hangup()
}

exports.url = url
exports.next = next
