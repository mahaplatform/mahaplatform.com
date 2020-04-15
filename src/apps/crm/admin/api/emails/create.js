import GenerateScreenshotQueue from '../../../queues/generate_screenshot_queue'
import { activity } from '../../../../../core/services/routes/activities'
import EmailSerializer from '../../../serializers/email_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Template from '../../../models/template'
import Program from '../../../models/program'
import Email from '../../../models/email'

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
    title: req.body.title,
    code: emailCode,
    config: {
      ...template ? template.get('config') : {
        page: {
          background_color: '#DFDFDF'
        },
        header: {
          blocks: [{
            type: 'web',
            text: '<p>Not displaying correctly? <a href="<%- email.web_link %>">View in browser</a></p>',
            padding: 8,
            p_font_size: 12,
            p_text_align: 'center',
            p_line_height: 1.5
          }]
        },
        body: {
          background_color: '#FFFFFF',
          blocks: [{
            type: 'text',
            content_0: '<p>&lt;%- contact.first_name %&gt;,</p><p></p><p>Thank you for filling out our form</p>',
            padding: 16
          }]
        },
        footer: {
          blocks: [{
            type: 'preferences',
            text: '<p>This email was sent to <strong><%- contact.email %></strong>. If you would like to control how much email you recieve from us, you can <a href="<%- email.preferences_link %>">adjust your preferences</a></p>',
            padding: 8,
            p_font_size: 12,
            p_text_align: 'center',
            p_line_height: 1.5
          }]
        }
      },
      settings: {
        sender_id: req.body.sender_id,
        subject: req.body.subject,
        reply_to: req.body.reply_to,
        preview_text: req.body.subject
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
    '/admin/crm/emails'
  ])

  res.status(200).respond(email, EmailSerializer)

}

export default createRoute
