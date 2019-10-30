import WorkflowSerializer from '../../../serializers/workflow_serializer'
import Workflow from '../../../models/workflow'

const workflowsRoute = async (req, res) => {

  const workflows = await Workflow.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(workflows, WorkflowSerializer)

}

export default workflowsRoute
