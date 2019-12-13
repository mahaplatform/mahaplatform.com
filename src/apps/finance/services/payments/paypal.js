import RouteError from '../../../../core/objects/route_error'
import braintree from '../../../../core/services/braintree'
import PaymentMethod from '../../models/payment_method'
import Payment from '../../models/payment'
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

export const chargePayPal= async (req, { invoice, customer, merchant, payment, amount }) => {

  const payment_method = await getPaymentMethod(req, {
    customer,
    payment
  })

  const result = await braintree.transaction.sale({
    merchantAccountId: merchant.get('braintree_id'),
    customerId: customer.get('braintree_id'),
    paymentMethodNonce: payment.nonce,
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

  console.log(result.transaction)

  return await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    merchant_id: merchant.get('id'),
    braintree_id: result.transaction.id,
    payment_method_id: payment_method.get('id'),
    // rate: payment_method.get('card_type') === 'amex' ? merchant.get('amex_rate') : merchant.get('rate'),
    reference: payment_method.get('description'),
    status: 'captured',
    method: 'paypal',
    amount,
    date: moment().format('YYYY-MM-DD')
  }).save(null, {
    transacting: req.trx
  })

}
