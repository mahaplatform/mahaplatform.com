import VoiceCampaignSerializer from '../../../../serializers/voice_campaign_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import VoiceCampaign from '../../../../models/voice_campaign'
import Program from '../../../../../maha/models/program'

const createRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.where('id', req.body.program_id)
  }).fetch({
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'crm_voice_campaigns'
  })

  const campaign = await VoiceCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    steps: [],
    program_id: program.get('id'),
    phone_number_id: program.get('phone_number_id'),
    ...whitelist(req.body, ['title','direction'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: campaign
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns'
  ])

  res.status(200).respond(campaign, VoiceCampaignSerializer)

}

export default createRoute
