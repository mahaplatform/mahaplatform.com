import MemberSerializer from '@apps/finance/serializers/member_serializer'
import Member from '@apps/finance/models/member'

const listRoute = async (req, res) => {

  const members = await Member.filterFetch({
    scope: (qb) => {
      qb.innerJoin('maha_users','maha_users.id','finance_members.user_id')
      qb.innerJoin('finance_projects','finance_projects.id','finance_members.project_id')
      qb.where('project_id', req.params.project_id)
      qb.where('finance_members.team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      allowed: ['type']
    },
    page: req.query.$page,
    withRelated: ['user.photo','project'],
    transacting: req.trx
  })

  await res.status(200).respond(members, MemberSerializer)

}

export default listRoute
