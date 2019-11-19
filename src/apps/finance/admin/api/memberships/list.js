import MembershipSerializer from '../../../serializers/membership_serializer'
import Project from '../../../models/project'

const listRoute = async (req, res) => {

  const projects = await Project.scope(qb => {
    qb.select('finance_projects.*', 'finance_members.type as member_type')
    qb.joinRaw('inner join finance_members on finance_members.project_id=finance_projects.id and finance_members.user_id=?', [req.user.get('id')])
    qb.where('finance_projects.team_id', req.team.get('id'))
    qb.where('finance_projects.is_active', true)
  }).filter({
    filter: req.query.$filter,
    searchParams: ['finance_projects.title','integration->>\'project_code\'']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['integration->>\'project_code\'','finance_projects.title'],
    sortParams: ['integration->>\'project_code\'','finance_projects.title','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, MembershipSerializer)

}

export default listRoute
