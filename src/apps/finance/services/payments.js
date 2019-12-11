import { whitelist } from '../../../core/services/routes/params'
import RouteError from '../../../core/objects/route_error'
import braintree from '../../../core/services/braintree'
import Payment from '../models/payment'
import Card from '../models/card'
import _ from 'lodash'

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

const chargeCard = async (req, { customer, merchant, credit_card, amount }) => {

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
    merchant_id: merchant.get('id'),
    braintree_id: result.transaction.id,
    card_id: card.get('id'),
    rate: card.get('type') === 'amex' ? merchant.get('amex_rate') : merchant.get('rate'),
    reference: card.get('description'),
    status: 'captured'
  }

}


const getBank = async(req, { customer, bank_account }) => {

  const { type, last_four, expiration_month, expiration_year, nonce } = credit_card

  // const card = await Card.scope(qb => {
  //   qb.where('team_id', req.team.get('id'))
  // }).query(qb => {
  //   qb.where('customer_id', customer.get('id'))
  //   qb.where({ type, last_four, expiration_month, expiration_year })
  // }).fetch({
  //   transacting: req.trx
  // })
  //
  // if(card) return card

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
        payment: ['Processor error (Unable to authorize transaction)']
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

const chargeBank = async (req, {}) => {

  const customer = await braintree.customer.create({})

  const method = await braintree.paymentMethod.create({
    customerId: customer.customer.id,
    paymentMethodNonce: req.body.payment.nonce,
    options: {
      usBankAccountVerificationMethod: UsBankAccountVerification.VerificationMethod.NetworkCheck
    }
  })

  return await braintree.transaction.sale({
    amount: '10.00',
    paymentMethodToken: method.usBankAccount.token,
    merchantAccountId: 'cornellcooperativeextensionassociationoflivingstoncounty',
    options: {
      submitForSettlement: true
    }
  })

}

const chargeCustomer = async (req, { invoice, params }) => {

  const { method, credit_card, amount } = params

  if(_.includes(['cash','check','credit','scholarship'], method)) return {}

  const customer = await getCustomer(req, {
    customer: invoice.related('customer')
  })

  if(method === 'card') {
    return await chargeCard(req, {
      customer,
      merchant: invoice.related('program').related('merchant'),
      credit_card,
      amount
    })
  }

  if(method === 'ach') {
    return await chargeBank(req, {
      customer,
      merchant: invoice.related('program').related('merchant'),
      amount
    })
  }


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

  const charge = await chargeCustomer(req, {
    params,
    invoice
  })

  const payment = await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    status: 'received',
    ...charge,
    ...whitelist(params, ['date','method','photo_id','credit_id','scholarship_id','reference','amount'])
  }).save(null, {
    transacting: req.trx
  })

  return payment

}
