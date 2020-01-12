import ImportParseQueue from '../../../../maha/queues/import_parse_queue'
import ImportSerializer from '../../../../maha/serializers/import_serializer'
import Import from '../../../../maha/models/import'

const parseRoute = async (req, res) => {

  const imp = await Import.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    asset_id: req.body.asset_id,
    object_type: 'crm_contacts',
    headers: req.body.parse.headers,
    delimiter: req.body.parse.delimiter,
    mapping: req.body.mapping,
    stage: 'configuring'
  }).save(null, {
    transacting: req.trx
  })

  ImportParseQueue.enqueue(req, {
    id: imp.get('id')
  })

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', imp.get('id'))
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(_import, ImportSerializer)

}

export default parseRoute
