import ImportSerializer from '../../../serializers/import_serializer'
import Import from '../../../models/import'

const listRoute = async (req, res) => {

  const imports = await Import.scope({
    team: req.team
  }).query(qb => {
    qb.where('user_id', req.user.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['object_type','stage']
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at'
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(imports, ImportSerializer)

}

export default listRoute
