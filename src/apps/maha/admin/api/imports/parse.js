import ImportSerializer from '@apps/maha/serializers/import_serializer'
import ImportParseQueue from '@apps/maha/queues/import_parse_queue'
import Import from '@apps/maha/models/import'

const parseRoute = async (req, res) => {

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  if(!_import) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  ImportParseQueue.enqueue(req, {
    id: req.params.id,
    rules: req.body.rules,
    table: req.body.table,
    primaryKey: req.body.primaryKey
  })

  await res.status(200).respond(_import, ImportSerializer)

}

export default parseRoute
