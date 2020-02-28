import { activity } from '../../../../../../core/services/routes/activities'
import EmailSerializer from '../../../../serializers/email_serializer'
import generateCode from '../../../../../../core/utils/generate_code'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import Workflow from '../../../../models/workflow'
import Email from '../../../../models/email'

const createRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const emailCode = await generateCode(req, {
    table: 'crm_emails'
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    workflow_id: workflow.get('id'),
    program_id: workflow.get('program_id'),
    title: req.body.title,
    code: emailCode,
    config: {
      blocks: [
        {
          type: 'web',
          text: '<p>Not displaying correctly? <a href="<%- email.web_link %>">View in browser</a></p>',
          padding: 8,
          font_size: 12,
          text_align: 'center',
          line_height: 1.5
        }, {
          type: 'text',
          content_0: '<p>&lt;%- contact.first_name %&gt;,</p><p>Thank you for filling out our form</p>',
          padding: 16
        }, {
          type: 'preferences',
          text: '<p>This email was sent to <strong><%- contact.email %></strong>. If you would like to control how much email you recieve from us, you can <a href="<%- email.preferences_link %>">adjust your preferences</a></p>',
          padding: 8,
          font_size: 12,
          text_align: 'center',
          line_height: 1.5
        }
      ],
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

  await audit(req, {
    story: 'created',
    auditable: email
  })

  await activity(req, {
    story: 'created {object}',
    object: email
  })

  await socket.refresh(req, [
    `/admin/crm/workflows/${workflow.get('id')}`
  ])

  res.status(200).respond(email, EmailSerializer)

}

export default createRoute
