import { BackframeError, Route } from '../../../server'
import request from 'request-promise'

const processor = async (req, trx, options) => {

  try {

    const response = await request.head(req.query.url).promise()

    return response

  } catch(e) {

    throw new BackframeError({
      code: 404,
      message: 'Unable to load url'
    })

  }

}

const urlRoute = new Route({
  method: 'get',
  path: '/assets/url',
  processor
})

export default urlRoute
