import Invoice from '@apps/finance/models/invoice'
import Payment from '@apps/finance/models/payment'

export const getAllocations = async (req, { payment_id }) => {

  const payment = await Payment.query(qb => {
    qb.select('finance_payments.*','finance_payment_details.*')
    qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
    qb.where('id', payment_id)
  }).fetch({
    transacting: req.trx
  })

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_totals.*')
    qb.innerJoin('finance_invoice_totals','finance_invoice_totals.invoice_id','finance_invoices.id')
    qb.where('id', payment.get('invoice_id'))
  }).fetch({
    withRelated: ['invoice_line_items'],
    transacting: req.trx
  })

  const sorted = invoice.related('invoice_line_items').toArray().sort((li1, li2) => {
    return li1.get('total') < li2.get('total') ? 1 : -1
  }).map(line_item => {
    const percent = invoice.get('total') > 0 ? line_item.get('allocated') / invoice.get('total') : 0
    line_item.fee = Math.round(percent * payment.get('fee') * 100, 2) / 100
    return line_item
  })

  const total = sorted.reduce((total, line_item) => {
    return total + line_item.fee
  }, 0.00)

  const diff = Number(payment.get('fee')) - total

  return sorted.map((line_item, index) => {

    const total = line_item.get('total')

    const extra = index === 0 ? diff : 0

    return {
      payment_id: payment.get('id'),
      line_item_id: line_item.get('line_item_id'),
      amount: total - line_item.fee - extra,
      fee: line_item.fee,
      total: total
    }

  })

}
