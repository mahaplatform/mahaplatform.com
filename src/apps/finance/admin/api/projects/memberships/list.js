import MemberSerializer from '../../../../serializers/member_serializer'
import Member from '../../../../models/member'

const listRoute = async (req, res) => {

  const members = await Member.scope(qb => {
    qb.innerJoin('maha_users','maha_users.id','finance_members.user_id')
    qb.innerJoin('finance_projects','finance_projects.id','finance_members.project_id')
    qb.where('project_id', req.params.project_id)
    qb.where('finance_members.team_id', req.team.get('id'))
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['type']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo','project'],
    transacting: req.trx
  })

  res.status(200).respond(members, MemberSerializer)

}

export default listRoute
