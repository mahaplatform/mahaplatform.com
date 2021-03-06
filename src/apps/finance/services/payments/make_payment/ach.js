import RouteError from '@core/objects/route_error'
import braintree from '@core/vendor/braintree'
import PaymentMethod from '@apps/finance/models/payment_method'
import { UsBankAccountVerification } from 'braintree'
import Payment from '@apps/finance/models/payment'
import moment from 'moment'
import _ from 'lodash'

const getPaymentMethod = async(req, { customer, payment }) => {

  const { nonce, ownership_type, account_type, last_four } = payment

  const ach = await PaymentMethod.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('customer_id', customer.get('id'))
    qb.where('method', 'ach')
    qb.where('ownership_type', ownership_type)
    qb.where('account_type', account_type)
    qb.where('last_four', last_four)
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

  if(result.verified === false) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        payment: ['Processor error (Unable to verify bank account)']
      }
    })
  }

  const { bankName, token } = result.usBankAccount

  return await PaymentMethod.forge({
    team_id: req.team.get('id'),
    customer_id: customer.get('id'),
    method: 'ach',
    braintree_id: token,
    ownership_type,
    account_type,
    last_four,
    bank_name: bankName
  }).save(null, {
    transacting: req.trx
  })

}

export const chargeACH = async (req, { invoice, customer, bank, payment, amount }) => {

  const payment_method = await getPaymentMethod(req, {
    customer,
    payment
  })

  const result = await braintree.transaction.sale({
    merchantAccountId: bank.get('braintree_id'),
    paymentMethodToken: payment_method.get('braintree_id'),
    amount,
    options: {
      submitForSettlement: true
    }
  })

  const errors = result.errors ? result.errors.deepErrors() : []

  if(errors.length > 0) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        payment: [`Unable to process payment (${errors[0].message})`]
      }
    })
  }

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
    bank_id: bank.get('id'),
    braintree_id: result.transaction.id,
    payment_method_id: payment_method.get('id'),
    cross_border_rate: 0.0000,
    rate: bank.get('ach_rate'),
    reference: payment_method.get('description'),
    status: 'captured',
    method: 'ach',
    amount,
    date: moment().format('YYYY-MM-DD')
  }).save(null, {
    transacting: req.trx
  })

}
