import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import ImportSerializer from '../../../serializers/import_serializer'
import Import from '../../../models/import'

const updateRoute = async (req, res) => {

  const _import = await Import.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  if(!_import) return req.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  await _import.save({
    ...whitelist(req.body, ['stage','delimiter','headers','mapping','name','strategy'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: _import
  })

  res.status(200).respond(_import, ImportSerializer)

}

export default updateRoute
