import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import { createVersion } from '@apps/maha/services/versions'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'

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

  await createVersion(req, {
    versionable_type: 'maha_phone_numbers',
    versionable_id: phone_number.id,
    key: 'config',
    value: {
      steps: []
    }
  })

  await audit(req, {
    story: 'created',
    auditable: voice_campaign
  })

  await socket.refresh(req, [
    '/admin/campaigns/voice/inbound'
  ])

}

export default createDefaultInboundCampaign
