import SmsCampaignSerializer from '../../../../serializers/sms_campaign_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import SmsCampaign from '../../../../models/sms_campaign'

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

  await socket.refresh(req, [
    `/admin/crm/campaigns/sms/${sms_campaign.get('direction')}`,
    `/admin/crm/campaigns/sms/${sms_campaign.get('id')}`
  ])

  res.status(200).respond(sms_campaign, SmsCampaignSerializer)

}

export default activateRoute
