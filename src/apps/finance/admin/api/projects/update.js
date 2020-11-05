import { activity } from '@core/services/routes/activities'
import ProjectSerializer from '@apps/finance/serializers/project_serializer'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Project from '@apps/finance/models/project'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const project = await Project.query(qb => {
    qb.where('team_id', req.team.get('id'))
    if(!_.includes(req.rights, 'finance:manage_configuration')) {
      qb.joinRaw('inner join finance_members on finance_members.project_id=finance_projects.id and finance_members.user_id=?', [req.user.get('id')])
    }
    qb.where('id', req.params.id)
  }).fetch({
    patch: true,
    transacting: req.trx
  })

  if(!project) return res.status(404).respond({
    code: 404,
    message: 'Unable to load project'
  })

  await project.save(whitelist(req.body, ['title','type','tax_project_id','integration']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: project
  })

  await audit(req, {
    story: 'updated',
    auditable: project
  })

  await socket.refresh(req, [
    '/admin/finance/projects',
    `/admin/finance/projects/${req.params.id}`
  ])

  res.status(200).respond(project, ProjectSerializer)

}

export default updateRoute
