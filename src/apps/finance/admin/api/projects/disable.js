import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Project from '../../../models/project'

const enableRoute = async (req, res) => {

  const project = await Project.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  await project.save({
    is_active: false
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/finance/projects',
    `/admin/finance/projects/${project.get('id')}`
  ])

  await activity(req, {
    story: 'disabled {object}',
    object: project
  })

  await audit(req, {
    story: 'disabled',
    auditable: project
  })

  res.status(200).respond(true)

}

export default enableRoute
