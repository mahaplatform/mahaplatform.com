import VoiceCampaignSerializer from '../../../../serializers/voice_campaign_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import VoiceCampaign from '../../../../models/voice_campaign'

const activateRoute = async (req, res) => {

  const voice_campaign = await VoiceCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['phone_number','program'],
    transacting: req.trx
  })

  if(!voice_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  await voice_campaign.save({
    status: req.body.status
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/crm/campaigns/voice/${voice_campaign.get('direction')}`,
    `/admin/crm/campaigns/voice/${voice_campaign.get('id')}`
  ])

  res.status(200).respond(voice_campaign, VoiceCampaignSerializer)

}

export default activateRoute
