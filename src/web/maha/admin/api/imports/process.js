import { Route, ImportSerializer } from '../../../server'
import ImportProcessQueue from '../../../queues/import_process_queue'
import ImportItem from '../../../models/import_item'
import Import from '../../../models/import'
import moment from 'moment'
import _ from 'lodash'

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
