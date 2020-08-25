import InvoiceSerializer from '../../../../../finance/serializers/invoice_serializer'
import Invoice from '../../../../../finance/models/invoice'
import numeral from 'numeral'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const summary  = fs.readFileSync(path.join(__dirname,'..','..','..','..','emails','summary.ejs'), 'utf8')

const getPaymentData = async (req, { invoice_id }) => {

  if(!invoice_id) return {}

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('id', invoice_id)
  }).fetch({
    withRelated: ['invoice_line_items','payments.payment_method'],
    transacting: req.trx
  })

  const payment = invoice.related('payments').find((payment, index) => index === 0)

  const payment_summary = ejs.render(summary, {
    invoice: InvoiceSerializer(req, invoice),
    moment,
    numeral
  })

  return {
    payment_method: payment.get('method'),
    payment_amount: payment.get('amount'),
    payment_card: payment.get('reference'),
    payment_summary
  }

}

const getData = (field, value, payment) => {
  const type = field.type === 'contactfield' ? field.contactfield.type : field.type
  if(type === 'addressfield') return value ? value.description : null
  if(type === 'paymentfield') return payment ? payment.get('amount') : null
  return value
}

const getExpanded = (req, { basedata, fields, data, payment }) => {
  return fields.reduce((expanded, field ) => ({
    ...expanded,
    [field.name.token]: getData(field, data[field.code], payment)
  }), basedata)
}

const getResponseData = async (req, { response }) => {

  await response.load(['form.program','payment'], {
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

  return getExpanded(req, {
    basedata:{
      ...basedata,
      maha_url: response.get('url')
    },
    fields,
    data,
    payment: response.related('payment')
  })

}

const getRegistrationData = async (req, { registration }) => {

  await registration.load(['event.program','payment'], {
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

  return getExpanded(req, {
    basedata: {
      ...basedata,
      maha_url: registration.get('url')
    },
    fields,
    data,
    payment: registration.related('payment')
  })

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
