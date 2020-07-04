import { createOrUpdateContact, createInvoice, handlePayment } from '../../../services/forms'
import { checkToken } from '../../../../../core/services/routes/token'
import socket from '../../../../../core/services/routes/emitter'
import { enrollInWorkflows } from '../../../services/workflows'
import { contactActivity } from '../../../services/activities'
import Response from '../../../models/response'
import Form from '../../../models/form'
import moment from 'moment'
import _ from 'lodash'

const getLineItems = async (req, { products }) => {
  return await Promise.mapSeries(products, async(line_item) => {
    const product = products.find(product => {
      return product.code = line_item.code
    })
    return {
      project_id: product.project_id,
      donation_revenue_type_id: null,
      overage_strategy: null,
      revenue_type_id: product.revenue_type_id,
      price_type: 'fixed',
      fixed_price: product.price,
      low_price: null,
      high_price: null,
      tax_rate: product.tax_rate,
      is_tax_deductible: product.is_tax_deductible,
      description: product.description,
      quantity: line_item.quantity,
      price: line_item.price

    }
  })
}

const getInvoice = async (req, { contact, fields, form }) => {

  const productfield = fields.find(field => {
    return field.type === 'productfield'
  })

  if(!productfield) return null

  const line_items = getLineItems(req, {
    products: req.body[productfield.code].products
  })

  return await createInvoice(req, {
    program_id: form.get('program_id'),
    contact,
    line_items
  })

}

const submitRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.code)) {
    return res.status(401).send('Unauthorized')
  }

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

  const invoice = await getInvoice(req, {
    contact,
    fields,
    form
  })

  const payment = (invoice && req.body.payment) ? await handlePayment(req, {
    invoice,
    program: form.related('program'),
    payment: req.body.payment
  }) : null

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
    trigger_type: 'response',
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
    '/admin/crm/forms',
    `/admin/crm/forms/${form.get('id')}`,
    `/admin/crm/forms/${form.get('id')}/responses`
  ])

  res.status(200).respond(true)

}

export default submitRoute
