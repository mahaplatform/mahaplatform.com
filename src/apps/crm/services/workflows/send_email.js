import { personalizeEmail, renderEmail } from '../../services/email'
import generateCode from '../../../../core/utils/generate_code'
import { encodeEmail } from '../../../maha/services/emails'
import { sendMail } from '../../../../core/services/email'
import Email from '../../../maha/models/email'
import Contact from '../../models/contact'
import CRMEmail from '../../models/email'
import Sender from '../../models/sender'
import numeral from 'numeral'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const summary  = fs.readFileSync(path.join(__dirname,'..','..','emails','summary.ejs'), 'utf8')

export const sendEmail = async (req, params) => {

  const { response, email_id } = params

  await response.load(['form.program','invoice.payments'])

  const form = response.related('form')

  const fields = form.get('config').fields.filter(field => {
    return field.type !== 'text'
  })

  const payment = response.related('invoice').related('payments').toArray()[0]

  const contact = await Contact.query(qb => {
    qb.select(req.trx.raw('crm_contacts.*,crm_contact_primaries.*'))
    qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.where('crm_contacts.id', response.get('contact_id'))
  }).fetch({
    withRelated: ['email_addresses'],
    transacting: req.trx
  })

  const email_address = contact.related('email_addresses').toArray().find(email_address => {
    return email_address.get('address') === contact.get('email')
  })

  const data = response.get('data')

  const crm_email = await CRMEmail.query(qb => {
    qb.where('id', email_id)
  }).fetch({
    transacting: req.trx
  })

  const config = crm_email.get('config')

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const html = renderEmail(req, {
    config
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
    contact: {
      full_name: contact.get('full_name'),
      first_name: contact.get('first_name'),
      last_name: contact.get('last_name'),
      email: contact.get('email')
    },
    response: fields.reduce((response, field) => ({
      ...response,
      [field.name.token]: data[field.code],
      ...field.type === 'productfield' ? {
        [`${field.name.token}_summary`]: ejs.render(summary, {
          summary: data[field.code],
          numeral,
          payment: {
            amount: payment.get('amount'),
            activity: payment.get('activity')
          }
        })
      } : {}
    }), {})
  }

  const rendered = personalizeEmail(req, {
    subject: config.settings.subject,
    html,
    data: email_data
  })

  const sender = await Sender.query(qb => {
    qb.where('id', config.settings.sender_id)
  }).fetch({
    transacting: req.trx
  })

  const email = await Email.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    email_id: form.related('email').get('id'),
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

  return {}

}
