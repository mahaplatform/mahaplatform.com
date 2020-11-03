import WorkflowStep from '../../../automation/models/workflow_step'
import generateCode from '../../../../core/utils/generate_code'
import { audit } from '../../../../core/services/routes/audit'
import socket from '../../../../core/services/routes/emitter'
import VoiceCampaign from '../../models/voice_campaign'

const createDefaultInboundCampaign = async (req, { phone_number, program }) => {

  const voice_code = await generateCode(req, {
    table: 'crm_voice_campaigns'
  })

  const voice_campaign = await VoiceCampaign.forge({
    team_id: req.team.get('id'),
    code: voice_code,
    status: 'active',
    program_id: program.get('id'),
    phone_number_id: phone_number.get('id'),
    title: 'Default Phone System',
    direction: 'inbound',
    purpose: 'transactional'
  }).save(null, {
    transacting: req.trx
  })

  const step_code = await generateCode(req, {
    table: 'crm_workflow_steps'
  })

  await WorkflowStep.forge({
    team_id: req.team.get('id'),
    voice_campaign_id: voice_campaign.get('id'),
    code: step_code,
    delta: 0,
    type: 'voice',
    action: 'voicemail',
    is_active: true,
    config: {
      name: {
        value: 'Voicemail',
        token: 'voicemail'
      },
      strategy: 'say',
      message: 'No one is able to take your call. Please leave a message at the tone.'
    }
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: voice_campaign
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns/voice/inbound'
  ])

}

export default createDefaultInboundCampaign
