import InvoiceSerializer from '@apps/finance/serializers/invoice_serializer'
import Invoice from '@apps/finance/models/invoice'
import numeral from 'numeral'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const summary  = fs.readFileSync(path.join(__dirname,'..','..','emails','payment_summary.ejs'), 'utf8')

const getPaymentTokens = async (req, { invoice_id }) => {

  if(!invoice_id) return {}

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('id', invoice_id)
  }).fetch({
    withRelated: ['invoice_line_items','payments.payment_method'],
    transacting: req.trx
  })

  if(!invoice) return {}

  const payment = invoice.related('payments').find((payment, index) => index === 0)

  const payment_summary = ejs.render(summary, {
    invoice: InvoiceSerializer(req, invoice),
    moment,
    numeral
  })

  return {
    payment_method: payment ? payment.get('method') : null,
    payment_amount: payment ? payment.get('amount') : null,
    payment_card: payment ? payment.get('reference') : null,
    payment_summary
  }

}

export default getPaymentTokens
