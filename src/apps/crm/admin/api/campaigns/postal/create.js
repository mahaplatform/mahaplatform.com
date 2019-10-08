import PostalCampaignSerializer from '../../../../serializers/postal_campaign_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import PostalCampaign from '../../../../models/postal_campaign'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'crm_postal_campaigns'
  })

  const campaign = await PostalCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    ...whitelist(req.body, ['title','program_id','to'])
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

  res.status(200).respond(campaign, PostalCampaignSerializer)

}

export default createRoute
