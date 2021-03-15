import rest from 'rest'
import params from 'rest/interceptor/params'
import mime from 'rest/interceptor/mime'
import defaultRequest from 'rest/interceptor/defaultRequest'
import errorCode from 'rest/interceptor/errorCode'

class Request {

  client = null

  constructor() {
    this.client = rest.wrap(params).wrap(mime).wrap(defaultRequest).wrap(errorCode)
  }

  async get({ path }) {
    try {
      const result = await this.client({
        method: 'get',
        path: `${process.env.ADMIN_HOST}${path}`
      })
      return result.entity
    } catch(err) {
      console.log(err)
    }
  }

}

export default Request
