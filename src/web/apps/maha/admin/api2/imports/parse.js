import ImportSerializer from '../../../serializers/import_serializer'
import ImportParseQueue from '../../../queues/import_parse_queue'
import Import from '../../../models/import'

const parseRoute = async (req, res) => {

  const _import = await Import.query(qb => {
    qb.where('team_id', req.team.get('id'))
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

  res.status(200).respond(_import, (_import) => {
    return ImportSerializer(req, req.trx, _import)
  })

}

export default parseRoute
