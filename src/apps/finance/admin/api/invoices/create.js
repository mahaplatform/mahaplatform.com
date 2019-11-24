import { activity } from '../../../../../core/services/routes/activities'
import InvoiceSerializer from '../../../serializers/invoice_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'
import LineItem from '../../../models/line_item'
import Product from '../../../models/product'
import Invoice from '../../../models/invoice'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'finance_invoices'
  })

  const invoice = await Invoice.forge({
    team_id: req.team.get('id'),
    code,
    ...whitelist(req.body, ['customer_id','date','due'])
  }).save(null, {
    transacting: req.trx
  })

  req.body.line_items = [
    { product_id: 1, quantity: 2, price: 10.00, tax_rate: 0.00 }
  ]

  await Promise.map(req.body.line_items, async(line_item) => {

    const product = await Product.scope(qb => {
      qb.where('team_id', req.team.get('id'))
    }).query(qb => {
      qb.where('id', line_item.product_id)
    }).fetch({
      transacting: req.trx
    })

    await LineItem.forge({
      team_id: req.team.get('id'),
      invoice_id: invoice.get('id'),
      product_id: product.get('id'),
      quantity: line_item.quantity,
      price: line_item.price,
      tax_rate: line_item.tax_rate
    }).save(null, {
      transacting: req.trx
    })

  })

  await activity(req, {
    story: 'created {object}',
    object: invoice
  })

  await socket.refresh(req, [
    '/admin/finance/invoices'
  ])

  res.status(200).respond(invoice, InvoiceSerializer)

}

export default createRoute
