import { activity } from '../../../../../core/services/routes/activities'
import ProjectSerializer from '../../../serializers/project_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Project from '../../../models/project'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const project = await Project.scope({
    team: req.team
  }).query(qb => {
    if(!_.includes(req.rights, 'expenses:manage_configuration')) {
      qb.joinRaw('inner join expenses_members on expenses_members.project_id=expenses_projects.id and expenses_members.user_id=? and expenses_members.is_active=?', [req.user.get('id'), true])
    }
    qb.where('id', req.params.id)
  }).fetch({
    patch: true,
    transacting: req.trx
  })

  if(!project) return req.status(404).respond({
    code: 404,
    message: 'Unable to load project'
  })

  await project.save(whitelist(req.body, ['title', 'integration']), {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: project
  })

  await socket.refresh(req, [
    '/admin/expenses/projects',
    `/admin/expenses/projects/${req.params.id}`
  ])

  res.status(200).respond(project, (project) => {
    return ProjectSerializer(req, req.trx, project)
  })

}

export default updateRoute
