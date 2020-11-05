import VoiceCampaignSerializer from '@apps/campaigns/serializers/voice_campaign_serializer'
import { activity } from '@core/services/routes/activities'
import { updateSteps } from '@apps/automation/services/workflows'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'


const updateRoute = async (req, res) => {

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

  if(req.body.title) {
    await voice_campaign.save({
      ...whitelist(req.body, ['to','title','purpose'])
    }, {
      patch: true,
      transacting: req.trx
    })
  }

  if(req.body.steps) {
    await updateSteps(req, {
      voice_campaign,
      steps: req.body.steps
    })
  }

  await audit(req, {
    story: 'updated',
    auditable: voice_campaign
  })

  await activity(req, {
    story: 'updated {object}',
    object: voice_campaign
  })

  await socket.refresh(req, [
    `/admin/campaigns/voice/${voice_campaign.get('direction')}`,
    `/admin/campaigns/voice/${voice_campaign.get('id')}`
  ])

  res.status(200).respond(voice_campaign, VoiceCampaignSerializer)

}

export default updateRoute
