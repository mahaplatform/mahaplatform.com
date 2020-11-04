import WorkflowEnrollment from '../../../automation/models/workflow_enrollment'
import { contactActivity } from '../../../crm/services/activities'
import generateCode from '../../../../core/utils/generate_code'

export const enrollInCampaign = async (req, params) => {

  const { contact, call, phone_number, voice_campaign } = params

  const code = await generateCode(req, {
    table: 'crm_workflow_enrollments'
  })

  const enrollment = await WorkflowEnrollment.forge({
    team_id: req.team.get('id'),
    voice_campaign_id: voice_campaign.get('id'),
    contact_id: contact.get('id'),
    call_id: call.get('id'),
    phone_number_id: phone_number.get('id'),
    code,
    data: {},
    was_hungup: false,
    was_answering_machine: false,
    status: 'active',
    was_converted: false
  }).save(null, {
    transacting: req.trx
  })

  await contactActivity(req, {
    contact,
    type: 'voice_campaign',
    story: 'enrolled in inbound voice workflow',
    program_id: voice_campaign.get('program_id'),
    data: {
      enrollment_id: enrollment.get('id'),
      voice_campaign_id: voice_campaign.get('id')
    }
  })

  return enrollment


}

export default enrollInCampaign
