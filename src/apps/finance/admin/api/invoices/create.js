import { activity } from '../../../../../core/services/routes/activities'
import InvoiceSerializer from '../../../serializers/invoice_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import generateCode from '../../../../../core/utils/generate_code'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import LineItem from '../../../models/line_item'
import Product from '../../../models/product'
import Invoice from '../../../models/invoice'
import Coupon from '../../../models/coupon'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'finance_invoices'
  })

  const { line_items, coupon_id } = req.body.details

  const coupon = coupon_id ? await Coupon.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', coupon_id)
  }).fetch({
    transacting: req.trx
  }) : null

  const invoice = await Invoice.forge({
    team_id: req.team.get('id'),
    code,
    coupon_id: coupon ? coupon.get('id') : null,
    ...whitelist(req.body, ['customer_id','program_id','date','due','notes'])
  }).save(null, {
    transacting: req.trx
  })

  await Promise.map(line_items, async(line_item, delta) => {

    const product = await Product.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('id', line_item.product_id)
    }).fetch({
      transacting: req.trx
    })

    await LineItem.forge({
      team_id: req.team.get('id'),
      invoice_id: invoice.get('id'),
      product_id: product.get('id'),
      project_id: product.get('project_id'),
      revenue_type_id: product.get('revenue_type_id'),
      is_tax_deductible: product.get('is_tax_deductible'),
      delta,
      description: line_item.description,
      quantity: line_item.quantity,
      price: line_item.price,
      tax_rate: product.get('tax_rate'),
      ...(coupon && product.get('id') === coupon.get('product_id')) ? {
        discount_amount: coupon.get('amount'),
        discount_percent: coupon.get('percent')
      } : {},
      ...(product.get('overage_strategy') === 'donation') ? {
        base_price: product.get('low_price'),
        donation: Number(line_item.price) - Number(product.get('low_price')),
        donation_revenue_type_id: product.get('donation_revenue_type_id')
      } : {
        base_price: line_item.price,
        donation: 0.00
      }
    }).save(null, {
      transacting: req.trx
    })

  })

  await audit(req, {
    story: 'created',
    auditable: invoice
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
