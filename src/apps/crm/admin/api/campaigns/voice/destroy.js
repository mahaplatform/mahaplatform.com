import { activity } from '../../../../../../core/services/routes/activities'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import VoiceCampaign from '../../../../models/voice_campaign'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const voice_campaign = await VoiceCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!voice_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  await voice_campaign.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: 'deleted',
    auditable: voice_campaign
  })

  await activity(req, {
    story: 'deleted {object}',
    object: voice_campaign
  })

  await socket.refresh(req, [
    `/admin/crm/campaigns/voice/${voice_campaign.get('direction')}`,
    `/admin/crm/campaigns/voice/${voice_campaign.get('id')}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
