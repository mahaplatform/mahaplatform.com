import ContactImportImportQueue from '@apps/crm/queues/contactimport_import_queue'
import ContactImportParseQueue from '@apps/crm/queues/contactimport_parse_queue'
import ImportSerializer from '@apps/maha/serializers/import_serializer'
import Import from '@apps/maha/models/import'
import Profile from '@apps/maha/models/profile'

const getService = async (req, profile_id) => {
  if(!profile_id) return 'excel'
  const profile = await Profile.query(qb => {
    qb.where('id', profile_id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })
  return profile ? profile.related('source').get('text') : 'excel'
}

const createRoute = async (req, res) => {

  const service = await getService(req, req.body.profile_id)

  const imp = await Import.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    object_type: 'crm_contacts',
    primary_key: 'email',
    service,
    program_id: req.body.program_id,
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
    ContactImportParseQueue.enqueue(req, {
      import_id: imp.get('id')
    })
  }

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', imp.get('id'))
  }).fetch({
    withRelated: ['asset','program','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(_import, ImportSerializer)

}

export default createRoute
