import { activity } from '@core/services/routes/activities'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import EmailCampaign from '@apps/campaigns/models/email_campaign'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const email_campaign = await EmailCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!email_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  await email_campaign.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: 'deleted',
    auditable: email_campaign
  })

  await activity(req, {
    story: 'deleted {object}',
    object: email_campaign
  })

  await socket.refresh(req, [
    '/admin/campaigns/email',
    `/admin/campaigns/email/${email_campaign.get('id')}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
