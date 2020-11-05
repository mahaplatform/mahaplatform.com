import { activity } from '@core/services/routes/activities'
import InvoiceSerializer from '@apps/finance/serializers/invoice_serializer'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import LineItem from '@apps/finance/models/line_item'
import Invoice from '@apps/finance/models/invoice'

const updateRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['customer','line_items','payments.payment_method','program.logo'],
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

  const { line_items } = req.body.details

  await invoice.save({
    ...whitelist(req.body, ['customer_id','program_id','date','due','notes'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await Promise.map(invoice.related('line_items'), async(line_item) => {

    const item = line_items.find(item => {
      return item.id === line_item.id
    })

    if(item) {

      return await line_item.save({
        team_id: req.team.get('id'),
        invoice_id: invoice.get('id'),
        project_id: line_item.project_id,
        revenue_type_id: line_item.revenue_type_id,
        is_tax_deductible: line_item.is_tax_deductible,
        description: line_item.description,
        quantity: line_item.quantity,
        price: line_item.price,
        tax_rate: line_item.tax_rate
      }, {
        patch: true,
        transacting: req.trx
      })

    }

    await line_item.destroy({
      transacting: req.trx
    })

  })

  await Promise.map(line_items, async(line_item) => {

    if(line_item.id) return

    await LineItem.forge({
      team_id: req.team.get('id'),
      invoice_id: invoice.get('id'),
      project_id: line_item.project_id,
      revenue_type_id: line_item.revenue_type_id,
      is_tax_deductible: line_item.is_tax_deductible,
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
