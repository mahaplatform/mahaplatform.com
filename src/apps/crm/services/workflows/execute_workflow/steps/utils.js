import InvoiceSerializer from '../../../../../finance/serializers/invoice_serializer'
import Invoice from '../../../../../finance/models/invoice'
import numeral from 'numeral'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const summary  = fs.readFileSync(path.join(__dirname,'..','..','..','..','emails','summary.ejs'), 'utf8')

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

export const getEnrollmentData = async (req, { enrollment }) => {

  await enrollment.load(['response','registration'], {
    transacting: req.trx
  })

  if(enrollment.get('response_id')) {
    return await getResponseData(req, {
      response: enrollment.related('response')
    })
  }

  if(enrollment.get('registration_id')) {
    return await getRegistrationData(req, {
      registration: enrollment.related('registration')
    })
  }

  return null

}
