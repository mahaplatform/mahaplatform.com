import { getRecipients } from '@apps/campaigns/services/recipients'
import { enrollInWorkflow } from '../../../services/workflows'
import Workflow from '../../../models/workflow'

const enrollRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.select('crm_workflows.*','crm_workflow_results.*')
    qb.innerJoin('crm_workflow_results','crm_workflow_results.workflow_id','crm_workflows.id')
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
