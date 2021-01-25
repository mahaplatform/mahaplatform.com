const atob = require('atob')
const _ = require('lodash')
const qs = require('qs')

class Request {

  body = {}

  config = null

  cookies = null

  query = {}

  session = {}

  step = null

  constructor(event) {
    this.body = qs.parse(decodeURIComponent(atob(event.body)))
    this.query = qs.parse(event.rawQueryString)
    this.cookies = event.cookies
    this.session = {
      enrollment: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      state: 'steps.0',
      term: this.body.Body ? this.body.Body.toLowerCase() : null,
      ...this._extractSession()
    }
  }

  _extractSession() {
    if(!this.cookies) return {}
    const cookie = this.cookies.find(cookie => {
      return /^session/.test(cookie)
    })
    if(!cookie) return {}
    const values = qs.parse(cookie)
    return JSON.parse(atob(values.session))
  }

}

module.exports = Request
