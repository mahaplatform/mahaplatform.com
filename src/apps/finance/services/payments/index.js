import { audit } from '../../../../core/services/routes/audit'
import RouteError from '../../../../core/objects/route_error'
import braintree from '../../../../core/services/braintree'
import { chargeScholarship } from './scholarship'
import { chargeGooglePay } from './googlepay'
import { chargeApplePay } from './applepay'
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

const chargeCustomer = async (req, { invoice, params }) => {

  const paymentCreator = getPaymentCreator(params.method)

  if(_.includes(['cash','check','credit','scholarship'], params.method)) {
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

  const bank = invoice.related('program').related('bank')

  const payment = await paymentCreator(req, {
    invoice,
    customer,
    bank,
    payment: params.payment,
    amount: params.amount
  })

  await audit(req, {
    contact: customer,
    story: 'payment made',
    auditable: invoice
  })

  await audit(req, {
    contact: customer,
    story: 'created',
    auditable: payment
  })

  return payment

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

  return await chargeCustomer(req, {
    params,
    invoice
  })

}
