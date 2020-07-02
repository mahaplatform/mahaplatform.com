import RouteError from '../../../../core/objects/route_error'
import braintree from '../../../../core/services/braintree'
import PaymentMethod from '../../models/payment_method'
import Payment from '../../models/payment'
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

  if(!result.success) {
    const message = result.message || result.transaction.processorResponseText
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        payment: [`Payment declined (${message})`]
      }
    })
  }

  return await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    bank_id: bank.get('id'),
    braintree_id: result.transaction.id,
    payment_method_id: payment_method.get('id'),
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
