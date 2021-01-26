const atob = require('atob')
const _ = require('lodash')
const qs = require('qs')

class Request {

  body = {}

  config = null

  cookies = null

  env = 'development'

  query = {}

  step = null

  constructor(event) {
    this.body = event.body ? qs.parse(decodeURIComponent(atob(event.body))) : {}
    this.query = {
      enrollment: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      state: 'steps.0',
      ...qs.parse(event.rawQueryString)
    }
    this.config = JSON.parse(atob(this.body.config || this.query.config))
  }

}

module.exports = Request
