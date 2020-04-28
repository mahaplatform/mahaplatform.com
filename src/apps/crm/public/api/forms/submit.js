import { createOrUpdateContact, handlePayment } from '../../../services/forms'
import { checkToken } from '../../../../../core/services/routes/token'
import socket from '../../../../../core/services/routes/emitter'
import { enrollInWorkflows } from '../../../services/workflows'
import { contactActivity } from '../../../services/activities'
import Product from '../../../../finance/models/product'
import Response from '../../../models/response'
import Form from '../../../models/form'
import moment from 'moment'
import _ from 'lodash'

const getLineItems = async (req, { products }) => {
  return await Promise.mapSeries(products, async(line_item) => {
    return await Product.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('id', line_item.product_id)
    }).fetch({
      transacting: req.trx
    }).then(product => ({
      product_id: product.get('id'),
      project_id: product.get('project_id'),
      donation_revenue_type_id: product.get('donation_revenue_type_id'),
      revenue_type_id: product.get('revenue_type_id'),
      price_type: product.get('price_type'),
      fixed_price: product.get('fixed_price'),
      low_price: product.get('low_price'),
      high_price: product.get('high_price'),
      tax_rate: product.get('tax_rate'),
      is_tax_deductible: product.get('is_tax_deductible'),
      description: product.get('title'),
      quantity: line_item.quantity,
      price: line_item.price
    }))
  })
}

const getInvoice = async (req, { contact, fields, form, payment }) => {
  const productfield = fields.find(field => {
    return field.type === 'productfield'
  })

  if(!productfield) return null

  const line_items = getLineItems(req, {
    products: req.body[productfield.code].products
  })

  return await handlePayment(req, {
    program: form.related('program'),
    contact,
    line_items,
    payment: req.body.payment
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
    data: req.body
  })

  const invoice = await getInvoice(req, {
    contact,
    fields,
    form,
    payment: req.body.payment
  })

  const response = await Response.forge({
    team_id: form.get('team_id'),
    form_id: form.get('id'),
    contact_id: contact.get('id'),
    invoice_id: invoice ? invoice.get('id') : null,
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
