import { generatePDF } from '../../../services/invoices'
import Invoice from '../../../models/invoice'

const downloadRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['customer','invoice_line_items','payments.payment_method','program.logo'],
    transacting: req.trx
  })

  const pdf = await generatePDF(req, {
    invoice
  })

  res.setHeader('Content-disposition', `attachment; filename=invoice-${invoice.get('code')}.pdf`)

  res.status(200).type('application/pdf').send(pdf)

}

export default downloadRoute
