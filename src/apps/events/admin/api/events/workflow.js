import WorkflowSerializer from '@apps/automation/serializers/workflow_serializer'
import Workflow from '@apps/automation/models/workflow'
import Event from '@apps/events/models/event'

const workflowRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  const workflow = await Workflow.query(qb => {
    qb.select('crm_workflows.*','crm_workflow_results.*')
    qb.innerJoin('crm_workflow_results','crm_workflow_results.workflow_id','crm_workflows.id')
    qb.where('crm_workflows.team_id', req.team.get('id'))
    qb.where('crm_workflows.event_id', event.get('id'))
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  await res.status(200).respond(workflow, WorkflowSerializer)

}

export default workflowRoute
