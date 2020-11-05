import GenerateScreenshotQueue from '@apps/automation/queues/generate_screenshot_queue'
import EmailCampaignSerializer from '../../../serializers/email_campaign_serializer'
import { createWorkflow } from '@apps/automation/services/workflows'
import { activity } from '@core/services/routes/activities'
import { getDefaultConfig } from '@apps/automation/services/email'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import EmailCampaign from '../../../models/email_campaign'
import Template from '@apps/crm/models/template'
import Program from '@apps/crm/models/program'

const createRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.whereIn('crm_program_user_access.type', ['manage','edit'])
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.body.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const template = req.body.template_id ? await Template.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', program.get('id'))
    qb.where('id', req.body.template_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const code = await generateCode(req, {
    table: 'crm_email_campaigns'
  })

  const email_campaign = await EmailCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    program_id: program.get('id'),
    ...whitelist(req.body, ['to','title','purpose']),
    config: {
      ...template ? template.get('config') : getDefaultConfig(),
      settings: {
        sender_id: req.body.sender_id,
        subject: req.body.subject,
        reply_to: req.body.reply_to
      }
    }
  }).save(null, {
    transacting: req.trx
  })

  await createWorkflow(req, {
    email_campaign,
    title: 'Delivery Workflow',
    program_id: req.body.program_id
  })

  await GenerateScreenshotQueue.enqueue(req, {
    email_campaign_id: email_campaign.get('id')
  })

  await audit(req, {
    story: 'created',
    auditable: email_campaign
  })

  await activity(req, {
    story: 'created {object}',
    object: email_campaign
  })

  await socket.refresh(req, [
    '/admin/campaigns/email'
  ])

  res.status(200).respond(email_campaign, EmailCampaignSerializer)

}

export default createRoute
