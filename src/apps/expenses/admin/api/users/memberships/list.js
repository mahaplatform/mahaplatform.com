import MemberSerializer from '../../../../serializers/member_serializer'
import Member from '../../../../models/member'

const listRoute = async (req, res) => {

  const members = await Member.scope(qb => {
    qb.innerJoin('maha_users','maha_users.id','expenses_members.user_id')
    qb.innerJoin('expenses_projects','expenses_projects.id','expenses_members.project_id')
    qb.where('expenses_members.user_id', req.params.user_id)
    qb.where('expenses_members.team_id', req.team.get('id'))
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['expenses_projects.integration->>\'project_code\'', 'expenses_projects.title']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo','project'],
    transacting: req.trx
  })

  res.status(200).respond(members, MemberSerializer)

}

export default listRoute
