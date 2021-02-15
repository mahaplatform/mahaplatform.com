import { getPaymentTokens } from '@apps/finance/services/payments'
import Registration from '@apps/events/models/registration'
import Response from '@apps/forms/models/response'
import Order from '@apps/stores/models/order'

const getContactTokens = async(req, { contact }) => {
  const tokens = await req.trx('crm_contact_tokens').where(qb => {
    qb.where('contact_id', contact.get('id'))
  }).then(results => results[0])
  return {
    contact: tokens.tokens
  }
}

const getProgramTokens = async(req, { contact, program }) => {
  const tokens = await req.trx('crm_program_tokens').where(qb => {
    qb.where('contact_id', contact.get('id'))
    qb.where('program_id', program.get('id'))
  }).then(results => results[0])
  return {
    program: tokens.tokens
  }
}

const getRegistrationTokens = async (req, { enrollment }) => {
  const registration = await Registration.query(qb => {
    qb.select('events_registrations.*','events_registration_tokens.tokens')
    qb.innerJoin('events_registration_tokens','events_registration_tokens.registration_id','events_registrations.id')
    qb.where('id', enrollment.get('registration_id'))
  }).fetch({
    transacting: req.trx
  })
  const payment_tokens = await getPaymentTokens(req, {
    invoice_id: registration.get('invoice_id')
  })
  return {
    registration: {
      ...registration.get('tokens'),
      ...payment_tokens
    }
  }
}

const getResponseTokens = async (req, { enrollment }) => {
  const response = await Response.query(qb => {
    qb.select('crm_responses.*','crm_response_tokens.tokens')
    qb.innerJoin('crm_response_tokens','crm_response_tokens.response_id','crm_responses.id')
    qb.where('id', enrollment.get('response_id'))
  }).fetch({
    transacting: req.trx
  })
  const payment_tokens = await getPaymentTokens(req, {
    invoice_id: response.get('invoice_id')
  })
  return {
    response: {
      ...response.get('tokens'),
      ...payment_tokens
    }
  }
}

const getOrderTokens = async (req, { enrollment }) => {
  const order = await Order.query(qb => {
    qb.select('stores_orders.*','stores_order_tokens.tokens')
    qb.innerJoin('stores_order_tokens','stores_order_tokens.order_id','stores_orders.id')
    qb.where('id', enrollment.get('order_id'))
  }).fetch({
    transacting: req.trx
  })
  const payment_tokens = await getPaymentTokens(req, {
    invoice_id: order.get('invoice_id')
  })
  return {
    order: {
      ...order.get('tokens'),
      ...payment_tokens
    }
  }
}

const getRelatedTokens = async (req, { enrollment }) => {
  if(enrollment.get('response_id')) {
    return await getResponseTokens(req, {
      enrollment
    })
  }
  if(enrollment.get('registration_id')) {
    return await getRegistrationTokens(req, {
      enrollment
    })
  }
  if(enrollment.get('order_id')) {
    return await getOrderTokens(req, {
      enrollment
    })
  }
  return {}
}


const getEnrollmentTokens = async (req, { contact, enrollment, program }) => {
  return {
    ...await getContactTokens(req, {
      contact
    }),
    ...await getProgramTokens(req, {
      contact,
      program
    }),
    ...await getRelatedTokens(req, {
      enrollment
    })
  }
}

export default getEnrollmentTokens
