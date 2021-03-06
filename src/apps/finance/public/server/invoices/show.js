import InvoiceSerializer from '@apps/finance/serializers/invoice_serializer'
import Invoice from '@apps/finance/models/invoice'
import { readFile } from './utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const template = await readFile(path.join('finance','invoice','index.html'))

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['customer','invoice_line_items','payments','program.logo','team'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  req.team = invoice.related('team')

  const content = ejs.render(template, {
    invoice: InvoiceSerializer(req, invoice)
  })

  res.status(200).send(content)

}

export default showRoute
