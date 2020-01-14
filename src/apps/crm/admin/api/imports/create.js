import ContactImportImportQueue from '../../../queues/contactimport_import_queue'
import ImportParseQueue from '../../../../maha/queues/import_parse_queue'
import ImportSerializer from '../../../../maha/serializers/import_serializer'
import Import from '../../../../maha/models/import'

const createRoute = async (req, res) => {

  const imp = await Import.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    object_type: 'crm_contacts',
    asset_id: req.body.asset_id,
    headers: req.body.headers,
    delimiter: req.body.delimiter,
    mapping: req.body.mapping,
    name: req.body.name,
    strategy: req.body.strategy,
    stage: 'parsing',
    config: {}
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.profile_id) {
    ContactImportImportQueue.enqueue(req, {
      import_id: imp.get('id'),
      profile_id: req.body.profile_id,
      list_id: req.body.list_id
    })
  } else {
    ImportParseQueue.enqueue(req, {
      id: imp.get('id')
    })
  }

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

export default createRoute
