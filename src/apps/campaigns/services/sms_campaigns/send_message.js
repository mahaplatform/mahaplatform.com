import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import { executeWorkflow } from '@apps/automation/services/workflows'
import { contactActivity } from '@apps/crm/services/activities'
import generateCode from '@core/utils/generate_code'

const sendMessage = async (req, params) => {

  const { sms_campaign_id, phone_number_id, contact_id } = params

  const code = await generateCode(req, {
    table: 'crm_workflow_enrollments'
  })

  const enrollment = await WorkflowEnrollment.forge({
    team_id: req.team.get('id'),
    sms_campaign_id,
    phone_number_id,
    contact_id,
    code,
    data: {},
    session: {},
    status: 'active',
    was_converted: false,
    was_opted_out: false
  }).save(null, {
    transacting: req.trx
  })

  await enrollment.load(['contact','sms_campaign'], {
    transacting: req.trx
  })

  await contactActivity(req, {
    contact: enrollment.related('contact'),
    type: 'sms_campaign',
    story: 'received an outbound sms campaign',
    program_id: enrollment.related('sms_campaign').get('program_id'),
    data: {
      enrollment_id: enrollment.get('id'),
      sms_campaign_id: enrollment.related('sms_campaign').get('id')
    }
  })

  await executeWorkflow(req, {
    enrollment_id: enrollment.get('id')
  })

}

export default sendMessage
