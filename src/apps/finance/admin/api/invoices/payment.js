import { activity } from '../../../../../core/services/routes/activities'
import PaymentSerializer from '../../../serializers/payment_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import RouteError from '../../../../../core/objects/route_error'
import braintree from '../../../../../core/services/braintree'
import Merchant from '../../../models/merchant'
import Payment from '../../../models/payment'
import Invoice from '../../../models/invoice'
import Card from '../../../models/card'

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

  await customer.load(['contact'])

  await customer.related('contact').save({
    braintree_id: result.customer.id
  }, {
    transacting: req.trx
  })

  return customer.related('contact')

}

const getCard = async(req, { customer, credit_card }) => {

  const { type, last_four, expiration_month, expiration_year, nonce } = credit_card

  const card = await Card.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('customer_id', customer.get('id'))
    qb.where({ type, last_four, expiration_month, expiration_year })
  }).fetch({
    transacting: req.trx
  })

  if(card) return card

  const result = await braintree.paymentMethod.create({
    customerId: customer.get('braintree_id'),
    paymentMethodNonce: nonce
  })

  if(!result.success) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        payment: ['Processor error (Unable to authorize card)']
      }
    })
  }

  return await Card.forge({
    team_id: req.team.get('id'),
    customer_id: customer.get('id'),
    type,
    last_four,
    expiration_month,
    expiration_year,
    braintree_id: result.creditCard.token
  }).save(null, {
    transacting: req.trx
  })

}

const chargeCard = async (req, { invoice, merchant_id, credit_card, amount }) => {

  const merchant = await Merchant.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', merchant_id)
  }).fetch({
    transacting: req.trx
  })

  const customer = await getCustomer(req, {
    customer: invoice.related('customer')
  })

  const card = await getCard(req, {
    customer,
    credit_card
  })

  const result = await braintree.transaction.sale({
    merchantAccountId: merchant.get('braintree_id'),
    customerId: customer.get('braintree_id'),
    paymentMethodToken: card.get('braintree_id'),
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

  return {
    braintree_id: result.transaction.id,
    card_id: card.get('id'),
    rate: card.get('type') === 'amex' ? merchant.get('amex_rate') : merchant.get('rate'),
    reference: card.get('description'),
    status: 'captured'
  }

}

const paymentRoute = async (req, res) => {

  const invoice = await Invoice.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.invoice_id)
  }).fetch({
    withRelated: ['customer','coupon','line_items.product','payments','program.logo'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })


  if(invoice.get('balance') <= 0) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        amount: ['invoice has been paid in full']
      }
    })
  }

  if(Number(req.body.amount) > invoice.get('balance')) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        amount: [`must be less than or equal to the balance (${invoice.get('balance').toFixed(2)})`]
      }
    })
  }

  const charge = (req.body.method === 'card') ? await chargeCard(req, {
    ...req.body,
    invoice
  }) : {}

  const payment = await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    status: 'received',
    ...charge,
    ...whitelist(req.body, ['date','method','merchant_id','photo_id','credit_id','scholarship_id','reference','amount'])
  }).save(null, {
    transacting: req.trx
  })

  await payment.load(['card'], {
    transacting: req.trx
  })

  await invoice.load(['payments'], {
    transacting: req.trx
  })

  await audit(req, {
    story: 'payment received',
    auditable: invoice
  })

  await activity(req, {
    story: 'received payment for {object}',
    object: invoice
  })

  await socket.refresh(req, [
    '/admin/finance/invoices',
    `/admin/finance/invoices/${invoice.get('id')}`
  ])

  res.status(200).respond(payment, PaymentSerializer)

}

export default paymentRoute
