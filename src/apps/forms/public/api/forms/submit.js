import { createOrUpdateContact, createInvoice, handlePayment } from '@apps/forms/services/forms'
import { enrollInWorkflows } from '@apps/automation/services/workflows'
import { contactActivity } from '@apps/crm/services/activities'
import socket from '@core/services/routes/emitter'
import Response from '@apps/forms/models/response'
import Form from '@apps/forms/models/form'
import moment from 'moment'
import _ from 'lodash'

const getLineItems = (req, { fields, data }) => {
  return fields.filter(field => {
    return _.includes(['optionsfield','paymentfield','productfield'], field.type)
  }).filter(field => {
    return data[field.code]
  }).reduce((line_items, field) => [
    ...line_items,
    ...data[field.code].line_items.filter(line_item => {
      return line_item.quantity > 0 && line_item.price > 0
    }).map(line_item => ({
      project_id: line_item.project_id,
      donation_revenue_type_id: null,
      overage_strategy: null,
      revenue_type_id: line_item.revenue_type_id,
      price_type: 'fixed',
      fixed_price: line_item.price,
      low_price: null,
      high_price: null,
      tax_rate: line_item.tax_rate,
      is_tax_deductible: line_item.is_tax_deductible,
      description: line_item.description,
      quantity: line_item.quantity,
      price: line_item.price
    }))
  ], [])
}

const getPayment = async (req, { contact, data, fields, form, program }) => {

  const line_items = getLineItems(req, {
    data,
    fields
  })

  if(line_items.length === 0) return {}

  const invoice = await createInvoice(req, {
    program_id: form.get('program_id'),
    contact,
    line_items
  })

  const payment = await handlePayment(req, {
    invoice,
    program: form.related('program'),
    payment: data.payment
  })

  return { invoice, payment }

}

const submitRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['program','team','workflows'],
    transacting: req.trx
  })

  req.team = form.related('team')

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const fields = form.get('config').fields.filter(field => {
    return !_.includes(['text','hidden'], field.type)
  })

  const contact = await createOrUpdateContact(req, {
    form,
    fields,
    program: form.related('program'),
    data: req.body
  })

  const { invoice, payment } = await getPayment(req, {
    contact,
    data: req.body,
    fields,
    form,
    program: form.related('program')
  })

  const response = await Response.forge({
    team_id: form.get('team_id'),
    form_id: form.get('id'),
    contact_id: contact.get('id'),
    invoice_id: invoice ? invoice.get('id') : null,
    payment_id: payment ? payment.get('id') : null,
    referer: req.body.referer,
    ipaddress: req.body.ipaddress,
    duration: parseInt(moment().format('YYYYMMDDHHmmss')) - req.body.starttime,
    is_known: contact.is_known,
    data: req.body
  }).save(null, {
    transacting: req.trx
  })

  await enrollInWorkflows(req, {
    contact,
    trigger_type: 'response_created',
    form_id: form.get('id'),
    response
  })

  await contactActivity(req, {
    contact,
    type: 'response',
    story: 'filled out a form',
    program_id: form.get('program_id'),
    data: {
      form_id: form.get('id'),
      response_id: response.get('id')
    }
  })

  await socket.refresh(req, [
    '/admin/forms/forms',
    `/admin/forms/forms/${form.get('id')}`,
    `/admin/forms/forms/${form.get('id')}/responses`
  ])

  await res.status(200).respond(response, (req, response) => ({
    response_id: response.get('id'),
    contact_id: response.get('contact_id')
  }))

}

export default submitRoute
