import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  return req.query.columns.reduce((template, column) => ({
    ...template,
    [column]: ''
  }), {})

}

const templateRoute = new Route({
  method: 'get',
  path: '/template',
  processor
})

export default templateRoute
