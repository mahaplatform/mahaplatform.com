import { personalizeEmail, renderEmail } from '../../../../../services/email'
import generateCode from '../../../../../../../core/utils/generate_code'
import { encodeEmail } from '../../../../../../maha/services/emails'
import { sendMail } from '../../../../../../../core/services/email'
import Email from '../../../../../../maha/models/email'
import CRMEmail from '../../../../../models/email'
import Sender from '../../../../../models/sender'
import { getEnrollmentData } from '../utils'
import _ from 'lodash'

const getEmailAddress = async (req, { contact, data }) => {

  const email = _.get(data, 'email') || contact.get('email') || null

  if(!email) return null

  await contact.load(['email_addresses'], {
    transacting: req.trx
  })

  const email_addresses = contact.related('email_addresses').toArray()

  const email_address = email_addresses.find(email_address => {
    return email_address.get('address') === email
  })

  return email_address

}

const emailStep = async (req, { config, contact, enrollment, tokens }) => {

  if(!config.email_id) return {}

  const data = await getEnrollmentData(req, {
    enrollment
  })

  const email_address = await getEmailAddress(req, {
    contact,
    data
  })

  if(!email_address) return {}

  const crm_email = await CRMEmail.query(qb => {
    qb.where('id', config.email_id)
  }).fetch({
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const html = await renderEmail(req, {
    config: crm_email.get('config')
  })

  const email_data = {
    email: {
      code,
      facebook_link: `${process.env.WEB_HOST}/sf${code}`,
      twitter_link: `${process.env.WEB_HOST}/st${code}`,
      forward_link: `${process.env.WEB_HOST}/f${code}`,
      linkedin_link: `${process.env.WEB_HOST}/sl${code}`,
      pinterest_link: `${process.env.WEB_HOST}/sp${code}`,
      web_link: `${process.env.WEB_HOST}/w${code}`,
      preferences_link: `${process.env.WEB_HOST}/crm/p${code}${email_address.get('code')}`
    },
    ...tokens,
    response: enrollment.get('response_id') ? data : null,
    registration: enrollment.get('registration_id') ? data : null
  }

  const { cc, bcc, reply_to, sender_id, subject } = crm_email.get('config').settings

  const rendered = personalizeEmail(req, {
    subject,
    html,
    data: email_data
  })

  const sender = await Sender.query(qb => {
    qb.where('id', sender_id)
  }).fetch({
    transacting: req.trx
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    email_id: config.email_id,
    email_address_id: email_address.get('id'),
    from: sender.get('rfc822'),
    reply_to,
    to: contact.get('rfc822'),
    cc,
    bcc,
    subject: rendered.subject,
    html: rendered.html,
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

  const encoded = await encodeEmail(req, {
    html: rendered.html,
    code
  })

  const result = await sendMail({
    from: email.get('from'),
    to: email.get('to'),
    reply_to: email.get('reply_to') || 'no-reply@mahaplatform.com',
    cc,
    bcc,
    subject: rendered.subject,
    html: encoded
  })

  await email.save(result, {
    patch: true,
    transacting: req.trx
  })

  return {
    action: {
      email_id: email.get('id')
    }
  }

}

export default emailStep
