import RouteError from '../../../../core/objects/route_error'
import braintree from '../../../../core/services/braintree'
import PaymentMethod from '../../models/payment_method'
import { UsBankAccountVerification } from 'braintree'
import Payment from '../../models/payment'
import moment from 'moment'

const getPaymentMethod = async(req, { customer, payment }) => {

  const { nonce } = payment

  const ach = await PaymentMethod.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('customer_id', customer.get('id'))
    qb.where('method', 'ach')
  }).fetch({
    transacting: req.trx
  })

  if(ach) return ach

  const result = await braintree.paymentMethod.create({
    customerId: customer.get('braintree_id'),
    paymentMethodNonce: nonce,
    options: {
      usBankAccountVerificationMethod: UsBankAccountVerification.VerificationMethod.NetworkCheck
    }
  })

  if(!result.success) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        payment: ['Processor error (Unable to authorize bank account)']
      }
    })
  }

  const { bankName, last4, token } = result.usBankAccount

  return await PaymentMethod.forge({
    team_id: req.team.get('id'),
    customer_id: customer.get('id'),
    method: 'ach',
    braintree_id: token,
    last_four: last4,
    bank_name: bankName
  }).save(null, {
    transacting: req.trx
  })

}

export const chargeACH = async (req, { invoice, customer, merchant, payment, amount }) => {

  const payment_method = await getPaymentMethod(req, {
    customer,
    payment
  })

  const result = await braintree.transaction.sale({
    merchantAccountId: merchant.get('braintree_id'),
    paymentMethodToken: payment_method.get('braintree_id'),
    amount,
    options: {
      submitForSettlement: true
    }
  })

  if(!result.success) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        payment: [`Payment declined (${result.transaction.processorResponseText})`]
      }
    })
  }

  return await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    merchant_id: merchant.get('id'),
    braintree_id: result.transaction.id,
    payment_method_id: payment_method.get('id'),
    // rate: payment_method.get('card_type') === 'amex' ? merchant.get('amex_rate') : merchant.get('rate'),
    reference: payment_method.get('description'),
    status: 'captured',
    method: 'ach',
    amount,
    date: moment().format('YYYY-MM-DD')
  }).save(null, {
    transacting: req.trx
  })

}
