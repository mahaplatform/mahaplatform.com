import ProjectSerializer from '../../../serializers/project_serializer'
import Project from '../../../models/project'
import _ from 'lodash'

const listRoute = async (req, res) => {

  const projects = await Project.filter({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (finance_projects.id,finance_projects.integration->>\'project_code\',finance_projects.title) finance_projects.*'))
      if(_.includes(req.rights, 'finance:manage_configuration')) {
        qb.leftJoin('finance_members', 'finance_members.project_id', 'finance_projects.id')
      } else  {
        qb.joinRaw('inner join finance_members on finance_members.project_id=finance_projects.id and finance_members.user_id=?', [req.user.get('id')])
        qb.where('finance_projects.is_active', true)
      }
      qb.where('finance_projects.team_id', req.team.get('id'))
    },
    aliases: {
      project_code: 'integration->>\'project_code\''
    },
    filter: req.query.$filter,
    filterParams: ['type','is_active','user_id','tax_project_id'],
    searchParams: ['title','project_code'],
    virtualFilters: {
      user_id: (qb, filter) => {
        if(!filter.$eq) return
        qb.where('finance_members.user_id', filter.$eq)
      }
    },
    sort: req.query.$sort,
    defaultSort: ['project_code', 'title'],
    sortParams: ['id','title','is_active','project_code','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, ProjectSerializer)

}

export default listRoute
