import WorkflowSerializer from '@apps/automation/serializers/workflow_serializer'
import Workflow from '@apps/automation/models/workflow'
import Form from '@apps/forms/models/form'

const workflowRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const workflow = await Workflow.query(qb => {
    qb.select('automation_workflows.*','automation_workflow_results.*')
    qb.innerJoin('automation_workflow_results','automation_workflow_results.workflow_id','automation_workflows.id')
    qb.where('automation_workflows.team_id', req.team.get('id'))
    qb.where('automation_workflows.form_id', form.get('id'))
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default workflowRoute
