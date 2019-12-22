import Invoice from '../../../models/invoice'

const editRoute = async (req, res) => {

  const invoice = await Invoice.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['coupon','line_items'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  res.status(200).respond(invoice, (req, invoice) => ({
    date: invoice.get('date'),
    due: invoice.get('due'),
    customer_id: invoice.get('customer_id'),
    program_id: invoice.get('program_id'),
    notes: invoice.get('notes'),
    details: {
      coupon_id: invoice.get('coupon_id'),
      line_items: invoice.related('line_items').map(line_item => ({
        id: line_item.get('id'),
        product_id: line_item.get('product_id'),
        description: line_item.get('description'),
        quantity: line_item.get('quantity'),
        price: line_item.get('price'),
        tax_rate: line_item.get('tax_rate')
      }))
    }
  }))

}

export default editRoute
