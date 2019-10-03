import MemberSerializer from '../../../serializers/member_serializer'
import Member from '../../../models/member'

const listRoute = async (req, res) => {

  const members = await Member.scope({
    team: req.team
  }).query(qb => {
    qb.where('site_id', req.params.site_id)
  }).filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'last_name',
    sortParams: ['last_name','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(members, MemberSerializer)

}

export default listRoute
