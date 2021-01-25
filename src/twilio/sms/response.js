const btoa = require('btoa')

class Response {

  body = null

  headers = {
    'Content-Type': 'text/plain'
  }

  statusCode = 200

  constructor() {}

  render() {
    return {
      statusCode: this.statusCode,
      body: this.body,
      headers: this.headers
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

  setCookie(key, value) {
    const encoded = btoa(JSON.stringify(value))
    this.headers['Set-Cookie'] = `${key}=${encoded}`
  }

  expireCookie(key) {
    this.headers['Set-Cookie'] = 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  send(body) {
    this.body = body
    return this
  }

}

module.exports = Response
