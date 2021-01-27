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
    this.body = this.parseBody(event),
    this.query = {
      enrollment: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      state: 'steps.0',
      ...qs.parse(event.rawQueryString)
    }
    this.config = this.parseConfig(this.body, this.query)
  }

  parseBody(event) {
    const { body, isBase64Encoded } = event
    if(!body) return {}
    if(!isBase64Encoded) return body
    return qs.parse(decodeURIComponent(atob(body)))
  }

  parseConfig(body, query) {
    const config = body.config || query.config
    if(!config) return {}
    return JSON.parse(atob(config))
  }

}

module.exports = Request
