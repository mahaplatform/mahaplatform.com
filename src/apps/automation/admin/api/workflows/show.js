import WorkflowSerializer from '@apps/automation/serializers/workflow_serializer'
import Workflow from '@apps/automation/models/workflow'

const showRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.select('crm_workflows.*','crm_workflow_results.*')
    qb.innerJoin('crm_workflow_results','crm_workflow_results.workflow_id','crm_workflows.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['email','email_campaign','event','form','list','store','program.phone_number','topic'],
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  await res.status(200).respond(workflow, WorkflowSerializer)

}

export default showRoute
