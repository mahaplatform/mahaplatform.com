import RouteError from '@core/objects/route_error'
import braintree from '@core/vendor/braintree'
import PaymentMethod from '@apps/finance/models/payment_method'
import Payment from '@apps/finance/models/payment'
import moment from 'moment'

const getPaymentMethod = async(req, { customer, payment }) => {

  const { card_type, last_four } = payment

  const card = await PaymentMethod.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('customer_id', customer.get('id'))
    qb.where('method', 'googlepay')
    qb.where({ card_type, last_four })
  }).fetch({
    transacting: req.trx
  })

  if(card) return card

  return await PaymentMethod.forge({
    team_id: req.team.get('id'),
    customer_id: customer.get('id'),
    method: 'applepay',
    card_type,
    last_four
  }).save(null, {
    transacting: req.trx
  })

}

export const chargeApplePay = async (req, { invoice, customer, bank, payment, amount }) => {

  const payment_method = await getPaymentMethod(req, {
    customer,
    payment
  })

  const { nonce } = payment

  const result = await braintree.transaction.sale({
    merchantAccountId: bank.get('braintree_id'),
    customerId: customer.get('braintree_id'),
    amount,
    paymentMethodNonce: nonce,
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
    rate: payment_method.get('card_type') === 'amex' ? bank.get('amex_rate') : bank.get('rate'),
    reference: payment_method.get('description'),
    status: 'captured',
    method: 'applepay',
    amount,
    date: moment().format('YYYY-MM-DD')
  }).save(null, {
    transacting: req.trx
  })

}
