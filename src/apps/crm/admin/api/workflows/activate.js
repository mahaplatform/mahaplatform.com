import WorkflowSerializer from '../../../serializers/workflow_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Workflow from '../../../models/workflow'

const activateRoute = async (req, res) => {

  const workflow = await Workflow.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', req.params.id)
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

  await socket.refresh(req, [
    `/admin/crm/workflows/${workflow.get('code')}`
  ])

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default activateRoute
