import generateCode from '../../../core/utils/generate_code'
import { encodeEmail } from '../../maha/services/emails'
import { sendMail } from '../../../core/services/email'
import EmailCampaign from '../models/email_campaign'
import EmailAddress from '../models/email_address'
import Queue from '../../../core/objects/queue'
import { renderEmail } from '../services/email'
import Email from '../../maha/models/email'
import Sender from '../models/sender'

const processor = async (job, trx) => {

  const { email_campaign_id, email_address_id } = job.data

  const req = { trx }

  const email_address = await EmailAddress.query(qb => {
    qb.where('id', email_address_id)
  }).fetch({
    withRelated: ['contact','team'],
    transacting: req.trx
  })

  req.team = email_address.related('team')

  const contact = email_address.related('contact')

  const campaign = await EmailCampaign.query(qb => {
    qb.where('id', email_campaign_id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  const program = campaign.related('program')

  const config = campaign.get('config')

  const sender = await Sender.query(qb => {
    qb.where('id', config.settings.sender_id)
  }).fetch({
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const rendered = renderEmail(req, {
    config,
    subject: config.settings.subject,
    data: {
      contact: {
        full_name: contact.get('full_name'),
        first_name: contact.get('first_name'),
        last_name: contact.get('last_name'),
        email: contact.get('email')
      },
      email: {
        web_link: `${process.env.WEB_HOST}/w${code}`,
        preferences_link: `${process.env.WEB_HOST}/crm/preferences/email/${program.get('code')}${email_address.get('code')}`
      }
    }
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    email_campaign_id: campaign.get('id'),
    from: sender.get('rfc822'),
    reply_to: config.settings.reply_to,
    to: contact.get('rfc822'),
    subject: rendered.subject,
    html: rendered.html,
    code
  }).save(null, {
    transacting: req.trx
  })

  const encoded = await encodeEmail(req, {
    email
  })

  const result = await sendMail({
    from: email.get('from'),
    to: email.get('to'),
    reply_to: email.get('reply_to') || 'no-reply@mahaplatform.com',
    subject: email.get('subject'),
    html: encoded
  })

  await email.save(result, {
    patch: true,
    transacting: req.trx
  })

}

const failed = async (job, err) => {}

const SendEmailCampaignEmailQueue = new Queue({
  name: 'send_email_campaign_email',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default SendEmailCampaignEmailQueue
