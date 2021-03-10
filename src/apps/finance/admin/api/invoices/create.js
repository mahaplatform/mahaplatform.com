import { activity } from '@core/services/routes/activities'
import InvoiceSerializer from '@apps/finance/serializers/invoice_serializer'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import LineItem from '@apps/finance/models/line_item'
import Invoice from '@apps/finance/models/invoice'
const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'finance_invoices'
  })

  const { line_items } = req.body.details

  const invoice = await Invoice.forge({
    team_id: req.team.get('id'),
    code,
    ...whitelist(req.body, ['customer_id','program_id','date','due','notes'])
  }).save(null, {
    transacting: req.trx
  })

  await Promise.map(line_items, async(line_item, delta) => {
    await LineItem.forge({
      team_id: req.team.get('id'),
      invoice_id: invoice.get('id'),
      project_id: line_item.project_id,
      revenue_type_id: line_item.revenue_type_id,
      is_tax_deductible: line_item.is_tax_deductible,
      delta,
      description: line_item.description,
      quantity: line_item.quantity,
      price: line_item.price,
      tax_rate: line_item.tax_rate
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

  await res.status(200).respond(invoice, InvoiceSerializer)

}

export default createRoute
