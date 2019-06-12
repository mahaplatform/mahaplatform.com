import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Project from '../../../models/project'

const enableRoute = async (req, res) => {

  const project = await Project.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  await project.save({
    is_active: true
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/expenses/projects',
    `/admin/expenses/projects/${project.get('id')}`
  ])

  await activity(req, {
    story: 'enabled {object}',
    object: project
  })

  res.status(200).respond(true)

}

export default enableRoute
