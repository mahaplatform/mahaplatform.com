import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import ExecuteWorkflowQueue from '@apps/automation/queues/execute_workflow_queue'
import { contactActivity } from '@apps/crm/services/activities'
import generateCode from '@core/utils/generate_code'

export const enrollInCampaign = async (req, params) => {

  const { contact, phone_number, sms_campaign } = params

  // const existing = WorkflowEnrollment.query(qb => {
  //   qb.where('team_id', req.team.get('id'))
  //   qb.where('sms_campaign_id', sms_campaign.get('id'))
  //   qb.where('contact_id', contact.get('id'))
  // }).fetch({
  //   transacting: req.trx
  // })

  // should it be unique?
  // if(existing && workflow.get('is_unique')) return false

  const code = await generateCode(req, {
    table: 'crm_workflow_enrollments'
  })

  const enrollment = await WorkflowEnrollment.forge({
    team_id: req.team.get('id'),
    sms_campaign_id: sms_campaign.get('id'),
    contact_id: contact.get('id'),
    phone_number_id: phone_number.get('id'),
    code,
    data: {},
    status: 'active',
    was_converted: false,
    was_opted_out: false
  }).save(null, {
    transacting: req.trx
  })

  await contactActivity(req, {
    contact,
    type: 'sms_campaign',
    story: 'enrolled in inbound sms workflow',
    program_id: sms_campaign.get('program_id'),
    data: {
      enrollment_id: enrollment.get('id'),
      sms_campaign_id: sms_campaign.get('id')
    }
  })

  await ExecuteWorkflowQueue.enqueue(req, {
    enrollment_id: enrollment.get('id')
  })

}

export default enrollInCampaign
