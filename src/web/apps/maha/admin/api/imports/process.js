import { Route } from '../../../../../core/backframe'
import ImportSerializer from '../../../serializers/import_serializer'
import ImportProcessQueue from '../../../queues/import_process_queue'

const processor = async (req, trx, options) => {

  ImportProcessQueue.enqueue(req, trx, {
    id: req.resource.get('id'),
    destination: req.body.destination,
    defaultParams: req.body.defaultParams,
    table: req.body.table,
    primaryKey: req.body.primaryKey
  })

  return req.resource

}

const refresh = (req, trx, result, options) => `/admin/imports/${result.id}`

const processRoute = new Route({
  method: 'post',
  path: '/process',
  processor,
  refresh,
  serializer: ImportSerializer
})

export default processRoute
