import GenerateScreenshotQueue from '../../../../automation/queues/generate_screenshot_queue'
import EmailCampaignSerializer from '../../../serializers/email_campaign_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import EmailCampaign from '../../../models/email_campaign'

const updateRoute  = async (req, res) => {

  const email_campaign = await EmailCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!email_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  await email_campaign.save({
    ...whitelist(req.body, ['to','title','purpose','config'])
  }, {
    transacting: req.trx,
    patch: true
  })

  await GenerateScreenshotQueue.enqueue(req, {
    email_campaign_id: email_campaign.get('id')
  })

  await audit(req, {
    story: 'updated',
    auditable: email_campaign
  })

  await activity(req, {
    story: 'updated {object}',
    object: email_campaign
  })

  await socket.refresh(req, [
    '/admin/campaigns/email',
    `/admin/campaigns/email/${email_campaign.id}`
  ])

  res.status(200).respond(email_campaign, EmailCampaignSerializer)

}

export default updateRoute
