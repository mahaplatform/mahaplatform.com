import RouteError from '@core/objects/route_error'
import braintree from '@core/services/braintree'
import { chargeScholarship } from './scholarship'
import Allocation from '@apps/finance/models/allocation'
import { chargeGooglePay } from './googlepay'
import { chargeApplePay } from './applepay'
import Invoice from '@apps/finance/models/invoice'
import Payment from '@apps/finance/models/payment'
import { chargeCredit } from './credit'
import { chargePayPal } from './paypal'
import { chargeCheck } from './check'
import { chargeCard } from './card'
import { chargeCash } from './cash'
import { chargeACH } from './ach'
import _ from 'lodash'

const getPaymentCreator = (method) => {
  if(method === 'scholarship') return chargeScholarship
  if(method === 'googlepay') return chargeGooglePay
  if(method === 'applepay') return chargeApplePay
  if(method === 'paypal') return chargePayPal
  if(method === 'credit') return chargeCredit
  if(method === 'check') return chargeCheck
  if(method === 'card') return chargeCard
  if(method === 'cash') return chargeCash
  if(method === 'ach') return chargeACH
}

const getCustomer = async(req, { customer }) => {

  if(customer.get('braintree_id')) return customer

  const result = await braintree.customer.create({
    firstName: customer.get('first_name'),
    lastName: customer.get('last_name'),
    email: customer.get('email')
  })

  if(!result.success) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        payment: ['Processor error (Unable to create customer)']
      }
    })
  }

  await customer.load(['contact'], {
    transacting: req.trx
  })

  await customer.related('contact').save({
    braintree_id: result.customer.id
  }, {
    transacting: req.trx
  })

  return customer.related('contact')

}

const allocatePayment = async (req, { invoice_id, payment_id }) => {

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_totals.*')
    qb.innerJoin('finance_invoice_totals','finance_invoice_totals.invoice_id','finance_invoices.id')
    qb.where('id', invoice_id)
  }).fetch({
    withRelated: ['invoice_line_items'],
    transacting: req.trx
  })

  const payment = await Payment.query(qb => {
    qb.select('finance_payments.*','finance_payment_details.*')
    qb.innerJoin('finance_payment_details', 'finance_payment_details.payment_id', 'finance_payments.id')
    qb.where('id', payment_id)
  }).fetch({
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

  await Promise.mapSeries(sorted, async (line_item, index) => {

    const total = line_item.get('total')

    const extra = index === 0 ? diff : 0

    await Allocation.forge({
      team_id: req.team.get('id'),
      payment_id: payment.get('id'),
      line_item_id: line_item.get('line_item_id'),
      amount: total - line_item.fee - extra,
      fee: line_item.fee,
      total: total
    }).save(null, {
      transacting: req.trx
    })
  })

}

export const makePayment = async (req, { invoice, params }) => {

  const { amount } = params

  if(invoice.get('balance') <= 0) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        amount: ['invoice has been paid in full']
      }
    })
  }

  if(Number(amount) > invoice.get('balance')) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        amount: [`must be less than or equal to the balance (${invoice.get('balance').toFixed(2)})`]
      }
    })
  }

  const paymentCreator = getPaymentCreator(params.method)

  if(_.includes(['credit','scholarship'], params.method)) {
    return await paymentCreator(req, {
      invoice,
      ...params
    })
  }

  await invoice.load(['customer','program.bank'], {
    transacting: req.trx
  })

  const customer = await getCustomer(req, {
    customer: invoice.related('customer')
  })

  const payment = await paymentCreator(req, {
    invoice,
    customer,
    bank: invoice.related('program').related('bank'),
    date: params.date,
    payment: params.payment,
    amount: params.amount
  })

  await allocatePayment(req, {
    invoice_id: invoice.get('id'),
    payment_id: payment.get('id')
  })

  return payment

}
