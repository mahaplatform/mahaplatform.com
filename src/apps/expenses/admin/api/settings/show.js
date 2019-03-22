import { Route } from 'maha'

const processor = async (req, trx, options) => {

  const settings = req.apps.expenses.settings

  return settings

}

const showRoute = new Route({
  method: 'get',
  path: '',
  processor
})

export default showRoute
