import InvoiceSerializer from '../../../../finance/serializers/invoice_serializer'
import { personalizeEmail, renderEmail } from '../../../services/email'
import generateCode from '../../../../../core/utils/generate_code'
import { encodeEmail } from '../../../../maha/services/emails'
import { sendMail } from '../../../../../core/services/email'
import Invoice from '../../../../finance/models/invoice'
import Email from '../../../../maha/models/email'
import CRMEmail from '../../../models/email'
import Sender from '../../../models/sender'
import numeral from 'numeral'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const summary  = fs.readFileSync(path.join(__dirname,'..','..','..','emails','summary.ejs'), 'utf8')

const getPaymentSummary = async (req, { invoice_id }) => {

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('id', invoice_id)
  }).fetch({
    withRelated: ['coupon','invoice_line_items','payments.payment_method'],
    transacting: req.trx
  })

  return ejs.render(summary, {
    invoice: InvoiceSerializer(req, invoice),
    moment,
    numeral
  })

}

const getPaymentData = async (req, { invoice_id }) => {

  if(!invoice_id) return {}

  const payment_summary = await getPaymentSummary(req, {
    invoice_id
  })

  return { payment_summary }

}

const getResponseData = async (req, { response }) => {

  await response.load(['form.program'], {
    transacting: req.trx
  })

  const config = response.related('form').get('config')

  const fields = config.fields.filter(field => {
    return field.type !== 'text'
  })

  const data = response.get('data')

  const basedata = await getPaymentData(req, {
    invoice_id: response.get('invoice_id')
  })

  return fields.reduce((response, field) => ({
    ...response,
    [field.name.token]: data[field.code]
  }), basedata)

}

const getRegistrationData = async (req, { registration }) => {

  await registration.load(['event.program'], {
    transacting: req.trx
  })

  const contact_config = registration.related('event').get('contact_config')

  const fields = contact_config.fields.filter(field => {
    return field.type !== 'text'
  })

  const data = registration.get('data')

  const basedata = await getPaymentData(req, {
    invoice_id: registration.get('invoice_id')
  })

  return fields.reduce((registration, field) => ({
    ...registration,
    [field.name.token]: data[field.code]
  }), basedata)

}

const sendEmail = async (req, { config, contact, enrollment, tokens }) => {

  if(!config.email_id) return {}

  await enrollment.load(['response','registration'], {
    transacting: req.trx
  })

  await contact.load(['email_addresses'], {
    transacting: req.trx
  })

  const email_address = contact.related('email_addresses').toArray().find(email_address => {
    return email_address.get('address') === contact.get('email')
  })

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
    response: enrollment.get('response_id') ? await getResponseData(req, {
      response: enrollment.related('response')
    }) : null,
    registration: enrollment.get('registration_id') ? await getRegistrationData(req, {
      registration: enrollment.related('registration')
    }) : null
  }

  const { reply_to, sender_id, subject } = crm_email.get('config').settings

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
    from: sender.get('rfc822'),
    reply_to,
    to: contact.get('rfc822'),
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
    subject: rendered.subject,
    html: encoded
  })

  await email.save(result, {
    patch: true,
    transacting: req.trx
  })

  return {
    data: {
      email_id: email.get('id')
    }
  }

}

export default sendEmail
