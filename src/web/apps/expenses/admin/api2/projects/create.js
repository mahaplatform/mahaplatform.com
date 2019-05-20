import { activity } from '../../../../../core/services/routes/activities'
import ProjectSerializer from '../../../serializers/project_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Project from '../../../models/project'

const createRoute = async (req, res) => {

  const project = await Project.forge({
    team_id: req.team.get('id'),
    is_active: true,
    integration: {},
    ...whitelist(req.body, ['title', 'integration'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: project
  })

  await socket.refresh(req, [
    '/admin/expenses/projects'
  ])

  res.status(200).respond(project, (project) => {
    return ProjectSerializer(req, req.trx, project)
  })

}

export default createRoute
