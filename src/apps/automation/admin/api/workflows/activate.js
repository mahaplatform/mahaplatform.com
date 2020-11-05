import WorkflowSerializer from '../../../serializers/workflow_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Workflow from '../../../models/workflow'

const activateRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  await workflow.save({
    status: req.body.is_active ? 'active' : 'inactive'
  },{
    transacting: req.trx
  })

  await audit(req, {
    story: req.body.is_active ? 'actived' : 'deactivated',
    auditable: workflow
  })

  await socket.refresh(req, [
    '/admin/automation/workflows',
    `/admin/automation/workflows/${workflow.get('id')}`
  ])

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default activateRoute
