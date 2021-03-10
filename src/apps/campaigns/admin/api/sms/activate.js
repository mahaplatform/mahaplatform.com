import SmsCampaignSerializer from '@apps/campaigns/serializers/sms_campaign_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import SmsCampaign from '@apps/campaigns/models/sms_campaign'

const activateRoute = async (req, res) => {

  const sms_campaign = await SmsCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['phone_number','program'],
    transacting: req.trx
  })

  if(!sms_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  await sms_campaign.save({
    status: req.body.status
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: req.body.status === 'active' ? 'activated' : 'deactivated',
    auditable: sms_campaign
  })

  await socket.refresh(req, [
    `/admin/campaigns/sms/${sms_campaign.get('direction')}`,
    `/admin/campaigns/sms/${sms_campaign.get('id')}`
  ])

  await res.status(200).respond(sms_campaign, SmsCampaignSerializer)

}

export default activateRoute
