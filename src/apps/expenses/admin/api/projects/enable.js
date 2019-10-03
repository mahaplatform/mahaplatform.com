import { activity } from '../../../../../web/core/services/routes/activities'
import { audit } from '../../../../../web/core/services/routes/audit'
import socket from '../../../../../web/core/services/routes/emitter'
import Project from '../../../models/project'

const enableRoute = async (req, res) => {

  const project = await Project.scope({
    team: req.team
  }).query(qb => {
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

  await audit(req, {
    story: 'enabled',
    auditable: project
  })

  res.status(200).respond(true)

}

export default enableRoute
