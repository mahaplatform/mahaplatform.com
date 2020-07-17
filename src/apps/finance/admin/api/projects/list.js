import ProjectSerializer from '../../../serializers/project_serializer'
import Project from '../../../models/project'
import _ from 'lodash'

const listRoute = async (req, res) => {

  const projects = await Project.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (finance_projects.id,finance_projects.integration->\'project_code\'->>0,finance_projects.title,finance_projects.is_active,finance_projects.created_at) finance_projects.*'))
      if(_.includes(req.rights, 'finance:manage_configuration')) {
        qb.leftJoin('finance_members', 'finance_members.project_id', 'finance_projects.id')
      } else if(_.includes(req.rights, 'finance:access_all_projects')) {
        qb.leftJoin('finance_members', 'finance_members.project_id', 'finance_projects.id')
        qb.where('finance_projects.is_active', true)
      } else {
        qb.joinRaw('inner join finance_members on finance_members.project_id=finance_projects.id and finance_members.user_id=?', [req.user.get('id')])
        qb.where('finance_projects.is_active', true)
      }
      qb.where('finance_projects.team_id', req.team.get('id'))
    },
    aliases: {
      project_code: 'integration->\'project_code\''
    },
    filter: {
      params: req.query.$filter,
      allowed: ['type','is_active','user_id','tax_project_id'],
      search: ['title','project_code'],
      virtuals: {
        user_id: (qb, filter) => {
          if(!filter.$eq) return
          qb.where('finance_members.user_id', filter.$eq)
        }
      }
    },
    sort: {
      params: req.query.$sort,
      defaults: ['project_code', 'title'],
      allowed: ['id','title','is_active','project_code','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, ProjectSerializer)

}

export default listRoute
