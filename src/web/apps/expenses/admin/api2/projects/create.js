import ProjectSerializer from '../../../serializers/project_serializer'
import Project from '../../../models/project'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const allowed = _.pick(req.body, ['title', 'integration'])

  const data = _.omitBy(allowed, _.isNil)

  const project = await Project.forge({
    team_id: req.team.get('id'),
    is_active: true,
    integration: {},
    ...data
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
