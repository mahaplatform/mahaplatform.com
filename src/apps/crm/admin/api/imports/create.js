import ContactImportImportQueue from '../../../queues/contactimport_import_queue'
import ImportSerializer from '../../../../maha/serializers/import_serializer'
import Profile from '../../../../maha/models/profile'
import Import from '../../../../maha/models/import'

const createRoute = async (req, res) => {

  const profile = await Profile.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.body.profile_id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const imp = await Import.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    object_type: 'crm_contacts',
    stage: 'parsing'
  }).save(null, {
    transacting: req.trx
  })

  ContactImportImportQueue.enqueue(req, {
    import_id: imp.get('id'),
    profile_id: profile.get('id'),
    list_id: req.body.list_id
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

export default createRoute
