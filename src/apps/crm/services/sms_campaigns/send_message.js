import WorkflowEnrollment from '../../models/workflow_enrollment'
import generateCode from '../../../../core/utils/generate_code'
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

  await executeWorkflow(req, {
    enrollment_id: enrollment.get('id')
  })

}

export default sendMessage
