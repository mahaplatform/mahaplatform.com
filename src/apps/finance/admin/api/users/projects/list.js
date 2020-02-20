import MembershipSerializer from '../../../../serializers/membership_serializer'
import Project from '../../../../models/project'

const listRoute = async (req, res) => {

  const projects = await Project.filterFetch({
    scope: (qb) => {
      qb.select('finance_projects.*', 'finance_members.type as member_type')
      qb.joinRaw('inner join finance_members on finance_members.project_id=finance_projects.id and finance_members.user_id=?', [req.params.user_id])
      qb.where('finance_projects.is_active', true)
      qb.where('finance_projects.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      search: ['finance_projects.title','integration->>\'project_code\'']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['finance_projects.integration->>\'project_code\'', 'finance_projects.title']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, MembershipSerializer)

}

export default listRoute
