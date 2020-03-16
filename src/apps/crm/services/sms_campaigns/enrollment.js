import ExecuteWorkflowQueue from '../../queues/execute_workflow_queue'
import WorkflowEnrollment from '../../models/workflow_enrollment'
import generateCode from '../../../../core/utils/generate_code'

export const enrollInCampaign = async (req, { contact, sms_campaign }) => {

  const existing = WorkflowEnrollment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('sms_campaign_id', sms_campaign.get('id'))
    qb.where('contact_id', contact.get('id'))
  }).fetch({
    transacting: req.trx
  })

  // should it be unique?
  // if(existing && workflow.get('is_unique')) return false

  const code = await generateCode(req, {
    table: 'crm_workflow_enrollments'
  })

  const enrollment = await WorkflowEnrollment.forge({
    team_id: req.team.get('id'),
    sms_campaign_id: sms_campaign.get('id'),
    contact_id: contact.get('id'),
    code,
    was_completed: false,
    was_converted: false
  }).save(null, {
    transacting: req.trx
  })

  await ExecuteWorkflowQueue.enqueue(req, {
    enrollment_id: enrollment.get('id')
  })

}

export default enrollInCampaign
