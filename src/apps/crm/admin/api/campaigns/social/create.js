import SocialCampaignSerializer from '../../../../serializers/social_campaign_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import SocialCampaign from '../../../../models/social_campaign'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'crm_social_campaigns'
  })

  const campaign = await SocialCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    ...whitelist(req.body, ['title','program_id','profile_id'])
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

  res.status(200).respond(campaign, SocialCampaignSerializer)

}

export default createRoute
