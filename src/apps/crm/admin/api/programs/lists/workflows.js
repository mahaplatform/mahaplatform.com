import WorkflowSerializer from '@apps/automation/serializers/workflow_serializer'
import Workflow from '@apps/automation/models/workflow'
import List from '@apps/crm/models/list'

const workflowsRoute = async (req, res) => {

  const list = await List.query(qb => {
    qb.where('program_id', req.params.program_id)
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['workflows'],
    transacting: req.trx
  })

  if(!list) return res.status(404).respond({
    code: 404,
    message: 'Unable to load list'
  })

  const workflows = await Workflow.query(qb => {
    qb.select('crm_workflows.*','crm_workflow_results.*')
    qb.innerJoin('crm_workflow_results','crm_workflow_results.workflow_id','crm_workflows.id')
    qb.where('crm_workflows.list_id', list.get('id'))
    qb.where('crm_workflows.team_id', req.team.get('id'))
    qb.whereNull('deleted_at')
  }).fetchAll({
    transacting: req.trx
  })

  await res.status(200).respond(workflows, WorkflowSerializer)

}

export default workflowsRoute
