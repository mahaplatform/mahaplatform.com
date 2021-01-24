const atob = require('atob')
const _ = require('lodash')
const qs = require('qs')

const generateCode = () => {
  return _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
}

const parseEvent = (event) => {
  const body = qs.parse(decodeURIComponent(atob(event.body)))
  const query = qs.parse(event.rawQueryString)
  if(!query.enrollment) query.enrollment = generateCode()
  if(!query.state) query.state = 'steps.0'
  return { body, query }
}

exports.parseEvent = parseEvent
