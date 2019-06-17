import MembershipSerializer from '../../../../serializers/membership_serializer'
import Project from '../../../../models/project'

const listRoute = async (req, res) => {

  const projects = await Project.scope({
    team: req.team
  }).query(qb => {
    qb.select('expenses_projects.*', 'expenses_member_types.name as member_type')
    qb.joinRaw('inner join expenses_members on expenses_members.project_id=expenses_projects.id and expenses_members.user_id=? and expenses_members.is_active=?', [req.params.user_id, true])
    qb.joinRaw('inner join expenses_member_types on expenses_member_types.id=expenses_members.member_type_id')
    qb.where('expenses_projects.is_active', true)
  }).filter({
    filter: req.query.$filter,
    searchParams: ['expenses_projects.title','integration->>\'project_code\'']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['expenses_projects.integration->>\'project_code\'', 'expenses_projects.title']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, MembershipSerializer)

}

export default listRoute
