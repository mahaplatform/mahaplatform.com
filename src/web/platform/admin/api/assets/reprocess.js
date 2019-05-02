import { Route, assembleAssetQueue, processAssetQueue } from 'maha'

const processor = async (req, trx, options) => {

  const queue =  req.resource.get('status') === 'chunked' ? assembleAssetQueue : processAssetQueue

  return await queue.enqueue(null, trx, req.params.id)

}

const reprocessRoute = new Route({
  method: 'patch',
  path: '/reprocess',
  processor
})

export default reprocessRoute
