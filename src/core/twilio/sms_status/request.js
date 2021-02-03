const atob = require('atob')
const qs = require('qs')

class Request {

  body = null

  constructor(event) {
    this.body = this.parseBody(event)
  }

  parseBody(event) {
    const { body, isBase64Encoded } = event
    if(!body) return {}
    if(!isBase64Encoded) return body
    return qs.parse(decodeURIComponent(atob(body)))
  }

}

module.exports = Request
