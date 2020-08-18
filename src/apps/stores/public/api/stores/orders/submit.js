import { createOrUpdateContact, createInvoice, handlePayment } from '../../../../../crm/services/forms'
import { enrollInWorkflows } from '../../../../../crm/services/workflows'
import { checkToken } from '../../../../../../core/services/routes/checks'
import { contactActivity } from '../../../../../crm/services/activities'
import socket from '../../../../../../core/services/routes/emitter'
import Store from '../../../../models/store'
import Order from '../../../../models/order'
import Item from '../../../../models/item'
import Cart from '../../../../models/cart'
import moment from 'moment'

const getLineItems = (req, { quantities, variants }) => {
  return Object.keys(quantities).map(code => {
    return variants.find(variant => {
      return variant.get('code') === code
    })
  }).filter(variant => {
    return quantities[variant.get('code')].quantity > 0
  }).map(variant => {
    const line_item = quantities[variant.get('code')]
    return {
      project_id: variant.get('project_id'),
      donation_revenue_type_id: variant.get('donation_revenue_type_id'),
      overage_strategy: variant.get('overage_strategy'),
      revenue_type_id: variant.get('revenue_type_id'),
      price_type: variant.get('price_type'),
      fixed_price: variant.get('fixed_price'),
      low_price: variant.get('low_price'),
      high_price: variant.get('high_price'),
      tax_rate: variant.get('tax_rate'),
      is_tax_deductible: variant.get('is_tax_deductible'),
      description: 'product',//`${store.get('title')}: ${variant.get('name')}`,
      quantity: line_item.quantity,
      price: line_item.price
    }
  })
}

const getInvoice = async (req, { program_id, contact, items, variants }) => {

  const quantities = items.reduce((quantities, item) => ({
    ...quantities,
    [item.code]: {
      price: item.price,
      quantity: item.quantity
    }
  }), {})

  const line_items = getLineItems(req, {
    quantities,
    variants
  })

  return await createInvoice(req, {
    program_id,
    contact,
    line_items
  })

}

const createItems = async (req, { order, items, variants }) => {

  await Promise.mapSeries(items, async(item) => {

    const variant = variants.find(variant => {
      return variant.get('code') === item.code
    })

    await Promise.mapSeries(Array(item.quantity).fill(0), async() => {
      await Item.forge({
        team_id: req.team.get('id'),
        order_id: order.get('id'),
        variant_id: variant.get('id'),
        status: 'pending'
      }).save(null, {
        transacting: req.trx
      })
    })

  })

}

const submitRoute = async (req, res) => {

  if(!checkToken(req.headers.authorization, req.params.store_code)) {
    return res.status(401).send('Unauthorized')
  }

  const store = await Store.query(qb => {
    qb.where('code', req.params.store_code)
    qb.whereNull('deleted_at')
  }).fetch({
    withRelated: ['program','team','products.variants'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const cart = await Cart.query(qb => {
    qb.where('code', req.body.code)
  }).fetch({
    transacting: req.trx
  })

  if(!cart) return res.status(422).respond({
    code: 422,
    message: 'Unable to load cart'
  })

  req.team = store.related('team')

  const variants = store.related('products').reduce((variants, product) => [
    ...variants,
    ...product.related('variants')
  ], [])


  const fields = [
    { code: 'first_name', type: 'contactfield', contactfield: { name: 'first_name' }, overwrite: true },
    { code: 'last_name', type: 'contactfield', contactfield: { name: 'last_name' }, overwrite: true },
    { code: 'email', type: 'contactfield', contactfield: { name: 'email' }, overwrite: true },
    ...store.get('contact_config').fields
  ]

  const contact = await createOrUpdateContact(req, {
    fields,
    program: store.related('program'),
    data: req.body.contact
  })

  const invoice = req.body.payment ? await getInvoice(req, {
    program_id: store.get('program_id'),
    contact,
    items: req.body.items,
    variants
  }) : null

  const payment = req.body.payment ? await handlePayment(req, {
    invoice,
    program: store.related('program'),
    payment: req.body.payment
  }) : null

  const order = await Order.forge({
    team_id: req.team.get('id'),
    store_id: store.get('id'),
    contact_id: contact.get('id'),
    cart_id: cart.get('id'),
    invoice_id: invoice ? invoice.get('id') : null,
    payment_id: payment ? payment.get('id') : null,
    referer: req.body.referer,
    ipaddress: req.body.ipaddress,
    duration: parseInt(moment().format('YYYYMMDDHHmmss')) - req.body.starttime,
    is_known: contact.is_known,
    data: req.body.contact
  }).save(null, {
    transacting: req.trx
  })

  await createItems(req, {
    order,
    variants,
    items: req.body.items
  })

  await enrollInWorkflows(req, {
    contact,
    trigger_type: 'order',
    store_id: store.get('id'),
    order
  })

  await contactActivity(req, {
    contact,
    type: 'order',
    story: 'placed an order',
    program_id: store.get('program_id'),
    data: {
      store_id: store.get('id'),
      order_id: order.get('id')
    }
  })

  await socket.refresh(req, [
    '/admin/stores/stores',
    `/admin/stores/stores/${store.get('id')}`,
    `/admin/stores/stores/${store.get('id')}/registrations`
  ])

  res.status(200).respond(true)

}

export default submitRoute
