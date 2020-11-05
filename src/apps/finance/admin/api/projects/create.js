import { activity } from '@core/services/routes/activities'
import ProjectSerializer from '../../../serializers/project_serializer'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Project from '../../../models/project'

const createRoute = async (req, res) => {

  const project = await Project.forge({
    team_id: req.team.get('id'),
    is_active: true,
    integration: {},
    ...whitelist(req.body, ['title','type','tax_project_id','integration'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: project
  })

  await audit(req, {
    story: 'created',
    auditable: project
  })

  await socket.refresh(req, [
    '/admin/finance/projects'
  ])

  res.status(200).respond(project, ProjectSerializer)

}

export default createRoute
