import ImportSerializer from '../../../serializers/import_serializer'
import ImportParseQueue from '../../../queues/import_parse_queue'
import Import from '../../../models/import'

const parseRoute = async (req, res) => {

  const _import = await Import.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!_import) return req.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  ImportParseQueue.enqueue(req, {
    id: req.params.id,
    rules: req.body.rules,
    table: req.body.table,
    primaryKey: req.body.primaryKey
  })

  res.status(200).respond(_import, ImportSerializer)

}

export default parseRoute
