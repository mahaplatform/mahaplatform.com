import ProjectSerializer from '../../../serializers/project_serializer'
import Project from '../../../models/project'
import _ from 'lodash'

const showRoute = async (req, res) => {

  const project = await Project.scope({
    team: req.team
  }).query(qb => {
    if(!_.includes(req.rights, 'expenses:manage_configuration')) {
      qb.joinRaw('inner join expenses_members on expenses_members.project_id=expenses_projects.id and expenses_members.user_id=? and expenses_members.is_active=?', [req.user.get('id'), true])
    }
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!project) return req.status(404).respond({
    code: 404,
    message: 'Unable to load project'
  })

  res.status(200).respond(project, ProjectSerializer)

}

export default showRoute
