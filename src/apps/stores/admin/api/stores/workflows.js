import WorkflowSerializer from '@apps/automation/serializers/workflow_serializer'
import Workflow from '@apps/automation/models/workflow'
import Store from '@apps/stores/models/store'

const workflowsRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const workflows = await Workflow.query(qb => {
    qb.select('automation_workflows.*','automation_workflow_results.*')
    qb.innerJoin('automation_workflow_results','automation_workflow_results.workflow_id','automation_workflows.id')
    qb.where('automation_workflows.store_id', store.get('id'))
    qb.where('automation_workflows.team_id', req.team.get('id'))
    qb.whereNull('automation_workflows.deleted_at')
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(workflows, WorkflowSerializer)

}

export default workflowsRoute
