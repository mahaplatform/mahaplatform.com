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

const getCustomer = async(req, { customer }) => {

  if(customer.get('braintree_id')) {
    return await braintree.customer.find(customer.get('braintree_id'))
  }

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

  return result.customer

}

const chargeCard = async (req, { invoice, merchant_id, payment, amount }) => {

  const { nonce, card_type, last_four, exp_month, exp_year } = payment

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

  const result = await braintree.transaction.sale({
    customerId: customer.id,
    amount,
    paymentMethodNonce: nonce,
    merchantAccountId: merchant.get('braintree_id'),
    options: {
      submitForSettlement: true
    }
  })

  if(!result.success) {
    throw new RouteError({
      status: 422,
      message: 'Unable to process payment',
      errors: {
        payment: [`Processor error (${result.transaction.processorResponseText})`]
      }
    })
  }

  return {
    braintree_id: result.transaction.id,
    card_type,
    metadata: {
      card_type,
      last_four,
      exp_month,
      exp_year
    },
    reference: last_four,
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

  const charge = (req.body.method === 'card') ? await chargeCard(req, {
    ...req.body,
    invoice
  }) : {}

  const payment = await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    status: 'received',
    ...charge,
    ...whitelist(req.body, ['date','method','merchant_id','credit_id','scholarship_id','reference','amount'])
  }).save(null, {
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
