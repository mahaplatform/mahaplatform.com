const qs = require('qs')

class Request {

  query = null

  constructor(event) {
    this.query = qs.parse(event.rawQueryString)
  }

}

module.exports = Request
