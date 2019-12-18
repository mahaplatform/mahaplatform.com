import { activity } from '../../../../../core/services/routes/activities'
import InvoiceSerializer from '../../../serializers/invoice_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import LineItem from '../../../models/line_item'
import Product from '../../../models/product'
import Invoice from '../../../models/invoice'
import Coupon from '../../../models/coupon'

const updateRoute = async (req, res) => {

  const invoice = await Invoice.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['customer','coupon','line_items.product','payments.payment_method','program.logo'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  if(invoice.related('payments').length > 0) return res.status(404).respond({
    code: 422,
    message: 'Unable to update invoice after a payment has been received'
  })

  const { line_items, coupon_id } = req.body.details

  const coupon = coupon_id ? await Coupon.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', coupon_id)
  }).fetch({
    transacting: req.trx
  }) : null

  await invoice.save({
    ...coupon ? {
      coupon_id: coupon.get('id'),
      discount_amount: coupon.get('amount'),
      discount_percent: coupon.get('percent')
    } : {},
    ...whitelist(req.body, ['customer_id','program_id','date','due','notes'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await Promise.map(invoice.related('line_items'), async(line_item) => {

    if(line_items.find(item => {
      return item.id === line_item.id
    }) !== undefined) return

    await line_item.destroy({
      transacting: req.trx
    })

  })

  await Promise.map(line_items, async(line_item) => {

    if(line_item.id) return

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
      project_id: product.get('project_id'),
      revenue_type_id: product.get('revenue_type_id'),
      description: line_item.description,
      quantity: line_item.quantity,
      price: line_item.price,
      tax_rate: line_item.tax_rate
    }).save(null, {
      transacting: req.trx
    })

  })

  await audit(req, {
    story: 'updated',
    auditable: invoice
  })

  await activity(req, {
    story: 'updated {object}',
    object: invoice
  })

  await socket.refresh(req, [
    '/admin/finance/invoices',
    `/admin/finance/invoices/${invoice.get('id')}`
  ])

  res.status(200).respond(invoice, InvoiceSerializer)

}

export default updateRoute
