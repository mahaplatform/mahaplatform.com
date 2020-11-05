import MembershipSerializer from '@apps/finance/serializers/membership_serializer'
import getUserAccess from '@core/utils/get_user_access'
import User from '@apps/maha/models/user'
import Project from '@apps/finance/models/project'
import _ from 'lodash'

const projectsRoute = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.user_id)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  const { rights } = await getUserAccess(req, user)

  const projects = await Project.filterFetch({
    scope: (qb) => {
      qb.select('finance_projects.*', 'finance_members.type as member_type')
      if(_.includes(rights, 'finance:manage_configuration')) {
        qb.leftJoin('finance_members', 'finance_members.project_id', 'finance_projects.id')
      } else if(_.includes(rights, 'finance:access_all_projects')) {
        qb.leftJoin('finance_members', 'finance_members.project_id', 'finance_projects.id')
      } else {
        qb.joinRaw('inner join finance_members on finance_members.project_id=finance_projects.id and finance_members.user_id=?', [user.get('id')])
      }
      qb.where('finance_projects.is_active', true)
      qb.where('finance_projects.team_id', req.team.get('id'))
    },
    aliases: {
      project: 'finance_projects.title',
      project_code: 'integration->\'project_code\''
    },
    filter: {
      params: req.query.$filter,
      search: ['project','project_code'],
      allowed: ['project','project_code']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['project','project_code']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, MembershipSerializer)

}

export default projectsRoute
