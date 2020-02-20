import MemberSerializer from '../../../serializers/member_serializer'
import Member from '../../../models/member'

const listRoute = async (req, res) => {

  const members = await Member.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('site_id', req.params.site_id)
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: 'last_name',
      allowed: ['last_name','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(members, MemberSerializer)

}

export default listRoute
