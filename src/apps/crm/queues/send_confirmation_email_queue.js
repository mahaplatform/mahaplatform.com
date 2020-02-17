import { personalizeEmail, renderEmail } from '../services/email'
import generateCode from '../../../core/utils/generate_code'
import { encodeEmail } from '../../maha/services/emails'
import { sendMail } from '../../../core/services/email'
import Queue from '../../../core/objects/queue'
import Email from '../../maha/models/email'
import Response from '../models/response'
import Contact from '../models/contact'
import Sender from '../models/sender'
import numeral from 'numeral'
import ejs from 'ejs'
import path from 'path'
import fs from 'fs'

const summary  = fs.readFileSync(path.join(__dirname,'..','emails','summary.ejs'), 'utf8')

const processor = async (job, trx) => {

  const response = await Response.query(qb => {
    qb.where('id', job.data.id)
  }).fetch({
    withRelated: ['form.program','form.email','team','invoice.payments'],
    transacting: trx
  })

  const req = {
    team: response.related('team'),
    trx
  }

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

  const config = form.related('email').get('config')

  const code = await generateCode(req, {
    table: 'maha_emails'
  })

  const html = renderEmail(req, {
    config
  })

  const rendered = personalizeEmail(req, {
    subject: config.settings.subject,
    html,
    data: {
      email: {
        code,
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
    subject: rendered.subject,
    html: rendered.html,
    code
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
    subject: email.get('subject'),
    html: encoded
  })

  await email.save(result, {
    patch: true,
    transacting: req.trx
  })

}

const failed = async (job, err) => {}

const SendConfirmationEmailQueue = new Queue({
  name: 'send_confirmation_email',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default SendConfirmationEmailQueue
