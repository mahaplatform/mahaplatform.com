import EmailCampaignSerializer from '@apps/campaigns/serializers/email_campaign_serializer'
import GenerateScreenshotQueue from '@apps/maha/queues/generate_screenshot_queue'
import EmailCampaign from '@apps/campaigns/models/email_campaign'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'

const cloneRoute = async (req, res) => {

  const campaign = await EmailCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const code = await generateCode(req, {
    table: 'crm_email_campaigns'
  })

  const cloned = await EmailCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    program_id: campaign.get('program_id'),
    ...whitelist(req.body, ['to','title','purpose']),
    config: {
      ...campaign.get('config'),
      settings: {
        ...campaign.get('config').settings,
        sender_id: req.body.sender_id,
        subject: req.body.subject,
        reply_to: req.body.reply_to
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  await GenerateScreenshotQueue.enqueue(req, {
    email_campaign_id: cloned.get('id')
  })

  await audit(req, {
    story: 'created',
    auditable: cloned
  })

  await activity(req, {
    story: 'created {object}',
    object: cloned
  })

  await socket.refresh(req, [
    '/admin/campaigns/email'
  ])

  await res.status(200).respond(cloned, EmailCampaignSerializer)

}

export default cloneRoute
