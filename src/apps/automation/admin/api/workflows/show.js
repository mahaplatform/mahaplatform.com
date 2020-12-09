import WorkflowSerializer from '@apps/automation/serializers/workflow_serializer'
import Workflow from '@apps/automation/models/workflow'

const showRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.select('automation_workflows.*','automation_workflow_results.*')
    qb.innerJoin('automation_workflow_results','automation_workflow_results.workflow_id','automation_workflows.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['email','email_campaign','event','form','list','store','program.phone_number','topic','steps'],
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default showRoute
