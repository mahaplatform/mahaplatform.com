import { getRecipients } from '@apps/campaigns/services/recipients'
import { enrollInWorkflow } from '@apps/automation/services/workflows'
import Workflow from '@apps/automation/models/workflow'

const enrollRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.select('automation_workflows.*','automation_workflow_results.*')
    qb.innerJoin('automation_workflow_results','automation_workflow_results.workflow_id','automation_workflows.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const recipients = await getRecipients(req, {
    type: 'all',
    program_id: workflow.get('program_id'),
    purpose: 'transactional',
    ...req.body.to
  }).then(result => result.toArray())

  await Promise.map(recipients, async (recipient) => {

    await enrollInWorkflow(req, {
      contact: recipient.related('contact'),
      workflow
    })

  })

  res.status(200).respond(true)

}

export default enrollRoute
