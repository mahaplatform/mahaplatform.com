import generateCode from '../../../core/utils/generate_code'
import { encodeEmail } from '../../maha/services/emails'
import { sendMail } from '../../../core/services/email'
import { personalizeEmail } from '../services/email'
import EmailCampaign from '../models/email_campaign'
import EmailAddress from '../models/email_address'
import Queue from '../../../core/objects/queue'
import Email from '../../maha/models/email'
import Contact from '../models/contact'
import Sender from '../models/sender'

const processor = async (req, job) => {

  const { email_campaign_id, email_address_id } = job.data

  const email_address = await EmailAddress.query(qb => {
    qb.where('id', email_address_id)
  }).fetch({
    transacting: req.trx
  })

  const contact = await Contact.query(qb => {
    qb.select('crm_contacts.*','crm_contact_primaries.*')
    qb.innerJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.where('id', email_address.get('contact_id'))
  }).fetch({
    transacting: req.trx
  })

  const campaign = await EmailCampaign.query(qb => {
    qb.where('id', email_campaign_id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

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
      full_name: contact.get('full_name'),
      first_name: contact.get('first_name'),
      last_name: contact.get('last_name'),
      email: contact.get('email')
    },
    email: {
      facebook_link: `${process.env.WEB_HOST}/sf${code}`,
      twitter_link: `${process.env.WEB_HOST}/st${code}`,
      forward_link: `${process.env.WEB_HOST}/f${code}`,
      linkedin_link: `${process.env.WEB_HOST}/sl${code}`,
      pinterest_link: `${process.env.WEB_HOST}/sp${code}`,
      web_link: `${process.env.WEB_HOST}/w${code}`,
      preferences_link: `${process.env.WEB_HOST}/crm/p${code}${email_address.get('code')}`
    }
  }

  const rendered = personalizeEmail(req, {
    subject: config.settings.subject,
    html: campaign.get('html'),
    data
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    email_campaign_id: campaign.get('id'),
    from: sender.get('rfc822'),
    reply_to: config.settings.reply_to,
    to: contact.get('rfc822'),
    code,
    data,
    was_bounced: false,
    was_complained: false,
    was_delivered: false,
    was_opened: false,
    was_unsubscribed: false,
    was_webviewed: false
  }).save(null, {
    transacting: req.trx
  })

  const encoded = await encodeEmail(req, {
    html: rendered.html,
    code
  })

  const result = await sendMail({
    from: email.get('from'),
    to: email.get('to'),
    reply_to: email.get('reply_to') || 'no-reply@mahaplatform.com',
    subject: rendered.subject,
    html: encoded
  })

  await email.save(result, {
    patch: true,
    transacting: req.trx
  })

}

const SendEmailCampaignEmailQueue = new Queue({
  name: 'send_email_campaign_email',
  processor
})

export default SendEmailCampaignEmailQueue
