import generateCode from '../../../core/utils/generate_code'
import { personalizeEmail } from '../../crm/services/email'
import { sendMail } from '../../../core/services/email'
import EmailActivity from '../models/email_activity'
import { encodeEmail } from '../services/emails'
import Queue from '../../../core/objects/queue'
import Email from '../models/email'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const template = fs.readFileSync(path.join(__dirname, '..','emails','forwarded.ejs'), 'utf8')

const processor = async (req, job) => {

  const { email_id, first_name, last_name, email, message } = job.data

  const forwarding = await Email.query(qb => {
    qb.where('id', email_id)
  }).fetch({
    withRelated: ['email_campaign','contact'],
    transacting: req.trx
  })

  if(forwarding.get('email_campaign_id')) {
    const campaign = forwarding.related('email_campaign')
    const personalized = personalizeEmail(req, {
      subject: campaign.get('config').settings.subject,
      html: campaign.get('html'),
      data: forwarding.get('data')
    })
    forwarding.set('subject', personalized.subject)
    forwarding.set('html', personalized.html)
  }

  const contact = forwarding.related('contact')

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const forward = await Email.forge({
    team_id: forwarding.get('team_id'),
    from: `${contact.full_name} <mailer@mahaplatform.com>`,
    reply_to: forwarding.get('reply_to'),
    to: `${first_name} ${last_name} <${email}>`,
    subject: `FW: ${forwarding.get('subject')}`,
    html: forwarding.get('html'),
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

  const forwarded = ejs.render(template, {
    contact: {
      full_name: contact.get('full_name')
    },
    recipient: {
      first_name,
      last_name,
      email
    },
    message
  })

  const encoded = await encodeEmail(req, {
    html: forward.get('html'),
    header: forwarded,
    code
  })

  await sendMail({
    from: forward.get('from'),
    to: forward.get('to'),
    reply_to: forward.get('reply_to') || 'no-reply@mahaplatform.com',
    subject: forward.get('subject'),
    html: encoded
  })

  await EmailActivity.forge({
    team_id: forwarding.get('team_id'),
    email_id: forwarding.get('id'),
    type: 'forward',
    forwarded_to: forward.get('to')
  }).save(null, {
    transacting: req.trx
  })

}

const ForwardEmailQueue = new Queue({
  name: 'forward_email',
  processor
})

export default ForwardEmailQueue
