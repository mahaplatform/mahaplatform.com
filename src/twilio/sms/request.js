const atob = require('atob')
const _ = require('lodash')
const qs = require('qs')

class Request {

  body = null

  config = null

  cookies = null

  query = null

  session = {
    enrollment: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
    state: 'steps.0'
  }

  step = null

  constructor(event) {
    this.body = qs.parse(decodeURIComponent(atob(event.body)))
    this.query = qs.parse(event.rawQueryString)
    this.cookies = event.cookies
    if(this.cookies) this._extractSession()
  }

  _extractSession() {
    const cookie = this.cookies.find(cookie => {
      return /^session/.test(cookie)
    })
    if(!cookie) return
    const values = qs.parse(cookie)
    this.session = JSON.parse(atob(values.session))
  }

}

module.exports = Request
