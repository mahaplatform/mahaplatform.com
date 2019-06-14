import AccessSerializer from '../../../serializers/access_serializer'
import Access from '../../../models/access'

const showRoute = async (req, res) => {

  const accesses = await Access.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.code)
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo','group'],
    transacting: req.trx
  })

  res.status(200).respond(accesses, (access) => {
    return AccessSerializer(req, req.trx, access)
  })

}

export default showRoute
