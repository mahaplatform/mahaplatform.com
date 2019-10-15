import ImportSerializer from '../../../serializers/import_serializer'
import Import from '../../../models/import'

const showRoute = async (req, res) => {

  const _import = await Import.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  if(!_import) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  res.status(200).respond(_import, ImportSerializer)

}

export default showRoute
