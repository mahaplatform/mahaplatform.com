import WorkflowEnrollment from '../../models/workflow_enrollment'
import generateCode from '../../../../core/utils/generate_code'
import { contactActivity } from '../../services/activities'
import { executeWorkflow } from '../workflows'

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
    status: 'active',
    was_converted: false
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
