import SMSCampaignSerializer from '../../../../serializers/sms_campaign_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import SMSCampaign from '../../../../models/sms_campaign'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'crm_sms_campaigns'
  })

  const campaign = await SMSCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    ...whitelist(req.body, ['title','direction','program_id','phone_number_id'])
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

  res.status(200).respond(campaign, SMSCampaignSerializer)

}

export default createRoute
