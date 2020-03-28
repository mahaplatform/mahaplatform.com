import { activity } from '../../../../../../core/services/routes/activities'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import SocialCampaign from '../../../../models/social_campaign'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const social_campaign = await SocialCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!social_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  await social_campaign.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: 'deleted',
    auditable: social_campaign
  })

  await activity(req, {
    story: 'deleted {object}',
    object: social_campaign
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns/social',
    `/admin/crm/campaigns/social/${social_campaign.get('id')}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
