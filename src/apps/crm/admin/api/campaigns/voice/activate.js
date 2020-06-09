import VoiceCampaignSerializer from '../../../../serializers/voice_campaign_serializer'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import VoiceCampaign from '../../../../models/voice_campaign'

const deactivateActive = async (req, { program }) => {

  const active = await VoiceCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', program.get('id'))
    qb.where('direction', 'inbound')
    qb.where('status', 'active')
  }).fetch({
    transacting: req.trx
  })

  if(!active) return

  await active.save({
    status: 'inactive'
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'deactivated',
    auditable: active
  })

}

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

  if(req.body.status === 'active') {
    await deactivateActive(req, {
      program: voice_campaign.related('program')
    })
  }

  await voice_campaign.save({
    status: req.body.status
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: req.body.status === 'active' ? 'activated' : 'deactivated',
    auditable: voice_campaign
  })

  await socket.refresh(req, [
    `/admin/crm/campaigns/voice/${voice_campaign.get('direction')}`,
    `/admin/crm/campaigns/voice/${voice_campaign.get('id')}`
  ])

  res.status(200).respond(voice_campaign, VoiceCampaignSerializer)

}

export default activateRoute
