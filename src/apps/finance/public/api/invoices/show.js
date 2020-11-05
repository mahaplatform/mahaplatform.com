import InvoiceSerializer from '@apps/finance/serializers/invoice_serializer'
import Invoice from '@apps/finance/models/invoice'

const showRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['customer','invoice_line_items','payments.payment_method','program.logo','team'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  req.team = invoice.related('team')

  res.status(200).respond(invoice, InvoiceSerializer)

}

export default showRoute
