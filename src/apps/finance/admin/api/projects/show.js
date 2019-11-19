import ProjectSerializer from '../../../serializers/project_serializer'
import Project from '../../../models/project'
import _ from 'lodash'

const showRoute = async (req, res) => {

  const project = await Project.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    if(!_.includes(req.rights, 'finance:manage_configuration')) {
      qb.joinRaw('inner join finance_members on finance_members.project_id=finance_projects.id and finance_members.user_id=?', [req.user.get('id')])
      qb.where('finance_projects.is_active', true)
    }
    qb.where('finance_projects.id', req.params.id)
  }).fetch({
    withRelated:['audit.story','audit.user.photo','tax_project'],
    transacting: req.trx
  })

  if(!project) return res.status(404).respond({
    code: 404,
    message: 'Unable to load project'
  })

  res.status(200).respond(project, ProjectSerializer)

}

export default showRoute
