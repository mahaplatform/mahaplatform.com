import MembershipSerializer from '@apps/finance/serializers/membership_serializer'
import Project from '@apps/finance/models/project'
import _ from 'lodash'

const listRoute = async (req, res) => {

  const projects = await Project.filterFetch({
    scope: (qb) => {
      qb.select('finance_projects.*', 'finance_members.type as member_type')
      if(_.includes(req.rights, 'finance:manage_configuration')) {
        qb.leftJoin('finance_members', 'finance_members.project_id', 'finance_projects.id')
      } else if(_.includes(req.rights, 'finance:access_all_projects')) {
        qb.leftJoin('finance_members', 'finance_members.project_id', 'finance_projects.id')
      } else {
        qb.joinRaw('inner join finance_members on finance_members.project_id=finance_projects.id and finance_members.user_id=?', [req.user.get('id')])
      }
      if(!_.includes(req.rights, 'finance:manage_configuration')) {
        qb.where('finance_projects.is_active', true)
      }
      qb.where('finance_projects.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      search: ['finance_projects.title','integration->\'project_code\'']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['integration->\'project_code\'','finance_projects.title'],
      allowed: ['integration->\'project_code\'','finance_projects.title','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, MembershipSerializer)

}

export default listRoute
