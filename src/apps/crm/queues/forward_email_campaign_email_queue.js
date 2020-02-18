import EmailActivity from '../../maha/models/email_activity'
import generateCode from '../../../core/utils/generate_code'
import { encodeEmail } from '../../maha/services/emails'
import { sendMail } from '../../../core/services/email'
import { renderEmail, personalizeEmail } from '../services/email'
import Queue from '../../../core/objects/queue'
import Email from '../../maha/models/email'
import Sender from '../models/sender'

const processor = async (job, trx) => {

  const req = { trx }

  const { email_id, first_name, last_name, email, message } = job.data

  const forwarding = await Email.query(qb => {
    qb.where('id', email_id)
  }).fetch({
    withRelated: ['email_campaign','contact','team'],
    transacting: req.trx
  })

  req.team = forwarding.related('team')

  const campaign = forwarding.related('email_campaign')

  const contact = forwarding.related('contact')

  const config = campaign.get('config')

  const sender = await Sender.query(qb => {
    qb.where('id', config.settings.sender_id)
  }).fetch({
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const data = {
    contact: {
      first_name,
      last_name,
      email
    },
    email: {
      facebook_link: `${process.env.WEB_HOST}/sf${code}`,
      twitter_link: `${process.env.WEB_HOST}/st${code}`,
      forward_link: `${process.env.WEB_HOST}/crm/f${code}`,
      linkedin_link: `${process.env.WEB_HOST}/sl${code}`,
      pinterest_link: `${process.env.WEB_HOST}/sp${code}`,
      web_link: `${process.env.WEB_HOST}/w${code}`
    }
  }

  const html = renderEmail(req, {
    config,
    data: {
      forwarded: {
        contact: {
          full_name: contact.get('full_name')
        },
        recipient: {
          first_name,
          last_name
        },
        message
      }
    }
  })

  const rendered = personalizeEmail(req, {
    subject: config.settings.subject,
    html,
    data
  })

  const forward = await Email.forge({
    team_id: req.team.get('id'),
    from: `${contact.full_name} <${sender.get('email')}>`,
    reply_to: config.settings.reply_to,
    to: `${first_name} ${last_name} <${email}>`,
    subject: `FW: ${rendered.subject}`,
    html: rendered.html,
    code,
    data
  }).save(null, {
    transacting: req.trx
  })

  const encoded = await encodeEmail(req, {
    html: forward.get('html'),
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
    team_id: forward.get('team_id'),
    email_id: forward.get('id'),
    type: 'forward'
  }).save(null, {
    transacting: req.trx
  })

}

const failed = async (job, err) => {}

const ForwardEmailCampaignEmailQueue = new Queue({
  name: 'forward_email_campaign_email',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default ForwardEmailCampaignEmailQueue
