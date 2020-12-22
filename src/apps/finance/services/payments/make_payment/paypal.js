import RouteError from '@core/objects/route_error'
import braintree from '@core/vendor/braintree'
import PaymentMethod from '@apps/finance/models/payment_method'
import Payment from '@apps/finance/models/payment'
import moment from 'moment'

const getPaymentMethod = async(req, { customer, payment }) => {

  const { email } = payment

  const card = await PaymentMethod.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('customer_id', customer.get('id'))
    qb.where('method', 'paypal')
    qb.where({ email })
  }).fetch({
    transacting: req.trx
  })

  if(card) return card

  return await PaymentMethod.forge({
    team_id: req.team.get('id'),
    customer_id: customer.get('id'),
    method: 'paypal',
    email
  }).save(null, {
    transacting: req.trx
  })

}

export const chargePayPal = async (req, { invoice, customer, bank, payment, amount }) => {

  const payment_method = await getPaymentMethod(req, {
    customer,
    payment
  })

  const result = await braintree.transaction.sale({
    merchantAccountId: bank.get('braintree_id'),
    customerId: customer.get('braintree_id'),
    paymentMethodNonce: payment.nonce,
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

  const { authorizationId, transactionFeeAmount } = result.transaction.paypal

  const expected_fee = amount * bank.get('rate') + 0.3

  const difference = transactionFeeAmount - expected_fee

  return await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    bank_id: bank.get('id'),
    braintree_id: result.transaction.id,
    paypal_id: result.transaction.paypal.authorizationId,
    payment_method_id: payment_method.get('id'),
    cross_border_rate: difference > 0 ? 0.0150 : 0.0000,
    rate: bank.get('rate'),
    reference: payment_method.get('description'),
    status: 'captured',
    method: 'paypal',
    amount,
    date: moment().format('YYYY-MM-DD')
  }).save(null, {
    transacting: req.trx
  })

}
