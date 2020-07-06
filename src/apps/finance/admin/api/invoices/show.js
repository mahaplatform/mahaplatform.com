import InvoiceSerializer from '../../../serializers/invoice_serializer'
import Invoice from '../../../models/invoice'

const showRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['customer','invoice_line_items','payments.payment_method','program.logo'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  res.status(200).respond(invoice, InvoiceSerializer)

}

export default showRoute
