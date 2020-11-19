import GenerateScreenshotQueue from '@apps/maha/queues/generate_screenshot_queue'
import { activity } from '@core/services/routes/activities'
import EmailSerializer from '@apps/automation/serializers/email_serializer'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { getDefaultConfig } from '@apps/automation/services/email'
import Template from '@apps/crm/models/template'
import Program from '@apps/crm/models/program'
import Email from '@apps/automation/models/email'

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

  const emailCode = await generateCode(req, {
    table: 'crm_emails'
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    program_id: program.get('id'),
    workflow_id: req.body.workflow_id,
    form_id: req.body.form_id,
    event_id: req.body.event_id,
    sms_campaign_id: req.body.sms_campaign_id,
    voice_campaign_id: req.body.voice_campaign_id,
    title: req.body.title,
    code: emailCode,
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

  await GenerateScreenshotQueue.enqueue(req, {
    email_id: email.get('id')
  })

  await audit(req, {
    story: 'created',
    auditable: email
  })

  await activity(req, {
    story: 'created {object}',
    object: email
  })

  await socket.refresh(req, [
    '/admin/automation/emails'
  ])

  res.status(200).respond(email, EmailSerializer)

}

export default createRoute
