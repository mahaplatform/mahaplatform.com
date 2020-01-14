import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import ImportSerializer from '../../../serializers/import_serializer'
import Import from '../../../models/import'

const createRoute = async (req, res) => {

  const imp = await Import.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    config: {},
    ...whitelist(req.body, ['object_type','asset_id','stage','delimiter','headers','mapping','name','strategy'])
  }).save(null, {
    transacting: req.trx
  })

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('maha_imports.id', imp.get('id'))
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: _import
  })

  res.status(200).respond(_import, ImportSerializer)

}

export default createRoute
