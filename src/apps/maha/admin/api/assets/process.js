import { Route } from '../../../server'
import { processAsset } from '../../../services/asset'

const processor = async (req, trx, options) => {

  return await processAsset(req.params.id)

}

const processRoute = new Route({
  path: '/assets/:id/process',
  method: 'get',
  processor
})

export default processRoute
