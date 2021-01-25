const atob = require('atob')
const _ = require('lodash')
const qs = require('qs')

const generateCode = () => {
  return _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
}

const newSession = () => ({
  enrollment: generateCode(),
  state: 'steps.0'
})

const getSession = (cookies) => {
  if(!cookies) return newSession()
  const cookie = cookies.find(cookie => {
    return /^session/.test(cookie)
  })
  if(!cookie) return newSession()
  const values = qs.parse(cookie)
  return JSON.parse(atob(values.session))
}

const parseEvent = (event) => {
  const body = qs.parse(decodeURIComponent(atob(event.body)))
  const query = qs.parse(event.rawQueryString)
  const session = getSession(event.cookies)
  return { body, query, session }
}

exports.parseEvent = parseEvent
