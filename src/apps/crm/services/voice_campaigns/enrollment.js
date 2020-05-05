import WorkflowEnrollment from '../../models/workflow_enrollment'
import generateCode from '../../../../core/utils/generate_code'
import { contactActivity } from '../activities'

export const enrollInCampaign = async (req, { contact, call, voice_campaign }) => {

  const code = await generateCode(req, {
    table: 'crm_workflow_enrollments'
  })

  const enrollment = await WorkflowEnrollment.forge({
    team_id: req.team.get('id'),
    voice_campaign_id: voice_campaign.get('id'),
    contact_id: contact.get('id'),
    call_id: call.get('id'),
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
      sms_campaign_id: voice_campaign.get('id')
    }
  })

  return enrollment


}

export default enrollInCampaign
