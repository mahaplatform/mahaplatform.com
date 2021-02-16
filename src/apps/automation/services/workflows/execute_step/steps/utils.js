import play from './voice/play'
import say from './voice/say'
import _ from 'lodash'
import qs from 'qs'

export const getUrl = (req, params) => {
  return `${process.env.TWILIO_HOST_TWIML}${req.originalUrl}?${qs.stringify(params)}`
}

export const getNext = (req, { config, state }) => {
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
  return nextstate
}

export const performAsk = (req, { config, state, step, twiml }) => {
  if(step.config.strategy === 'say') return say(req, { config, state, step, twiml }, true)
  if(step.config.strategy === 'play') return play(req, { config, state, step, twiml }, true)
}
