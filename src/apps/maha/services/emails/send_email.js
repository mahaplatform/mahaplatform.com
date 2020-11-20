import SendEmailQueue from '../../queues/send_email_queue'
import generateCode from '@core/utils/generate_code'
import renderTemplate from './render_template'
import Email from '../../models/email'

export const sendEmail = async(req, options) => {

  const { subject, html } = await renderTemplate(req, options)

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const email = await Email.forge({
    team_id: options.team_id,
    user_id: options.user ? options.user.get('id') : null,
    from: process.env.EMAIL_FROM || options.from || 'Maha <mailer@mahaplatform.com>',
    reply_to: options.reply_to,
    to: options.to || options.user.get('rfc822'),
    subject,
    html,
    code,
    was_bounced: false,
    was_clicked: false,
    was_complained: false,
    was_delivered: false,
    was_opened: false,
    was_unsubscribed: false,
    was_webviewed: false
  }).save(null, {
    transacting: req.trx
  })

  await SendEmailQueue.enqueue(req, {
    id: email.get('id')
  })

}
