const btoa = require('btoa')

class Response {

  body = null

  headers = {}

  statusCode = null

  constructor() {}

  render() {
    return {
      statusCode: this.statusCode,
      body: this.body,
      headers: this.headers,
      isBase64Encoded: true
    }
  }

  status(statusCode) {
    this.statusCode = statusCode
    return this
  }

  type(contentType) {
    this.headers['Content-Type'] = contentType
    return this
  }

  addHeader(key, value) {
    this.headers[key] = value
  }

  send(body) {
    this.body = body
    return this
  }

}

module.exports = Response
