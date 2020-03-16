import WorkflowEnrollment from '../../models/workflow_enrollment'
import generateCode from '../../../../core/utils/generate_code'

export const enrollInCampaign = async (req, { contact, voice_campaign }) => {

  const code = await generateCode(req, {
    table: 'crm_workflow_enrollments'
  })

  return await WorkflowEnrollment.forge({
    team_id: req.team.get('id'),
    voice_campaign_id: voice_campaign.get('id'),
    contact_id: contact.get('id'),
    code,
    was_hungup: false,
    was_answering_machine: false,
    was_completed: false,
    was_converted: false
  }).save(null, {
    transacting: req.trx
  })

}

export default enrollInCampaign
