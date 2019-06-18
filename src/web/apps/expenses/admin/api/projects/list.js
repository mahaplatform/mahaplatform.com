import ProjectSerializer from '../../../serializers/project_serializer'
import Project from '../../../models/project'
import _ from 'lodash'

const listRoute = async (req, res) => {

  const projects = await Project.scope({
    team: req.team
  }).query(qb => {
    if(_.includes(req.rights, 'expenses:manage_configuration')) {
      qb.leftJoin('expenses_members', 'expenses_members.project_id', 'expenses_projects.id')
    } else  {
      qb.joinRaw('inner join expenses_members on expenses_members.project_id=expenses_projects.id and expenses_members.user_id=? and expenses_members.is_active=?', [req.user.get('id'), true])
      qb.where('expenses_projects.is_active', true)
    }
  }).filter({
    filter: req.query.$filter,
    filterParams: ['is_active','user_id'],
    searchParams: ['title','integration->>\'project_code\''],
    virtualFilters: {
      user_id: (qb, filter) => {
        if(!filter.$eq) return
        qb.where('expenses_members.user_id', filter.$eq)
      }
    }
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['integration->>\'project_code\'', 'title'],
    sortParams: ['id','title','is_active','integration->>\'project_code\'','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, ProjectSerializer)

}

export default listRoute
