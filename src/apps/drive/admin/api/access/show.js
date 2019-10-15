import AccessSerializer from '../../../serializers/access_serializer'
import Access from '../../../models/access'

const showRoute = async (req, res) => {

  const accesses = await Access.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('code', req.params.code)
  }).query(qb => {
    qb.orderBy('access_type_id', 'asc')
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo','group'],
    transacting: req.trx
  })

  res.status(200).respond(accesses, AccessSerializer)

}

export default showRoute
