import ImportSerializer from '../../../serializers/import_serializer'
import { Route } from '../../../../../core/backframe'
import ImportParseQueue from '../../../queues/import_parse_queue'

const processor = async (req, trx, options) => {

  ImportParseQueue.enqueue(req, {
    id: req.resource.get('id'),
    rules: req.body.rules,
    table: req.body.table,
    primaryKey: req.body.primaryKey
  })

  return req.resource

}

const parseRoute = new Route({
  method: 'post',
  path: '/parse',
  processor,
  serializer: ImportSerializer
})

export default parseRoute
