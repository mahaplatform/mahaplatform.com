export const submit = (token, code, body) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/events/events/${code}/registrations`,
  body,
  token,
  request: 'SUBMIT_REQUEST',
  success: 'SUBMIT_SUCCESS',
  failure: 'SUBMIT_FAILURE'
})

export const updateContact = (contact) => ({
  type: 'UPDATE_CONTACT',
  contact
})

export const updatePayment = (payment) => ({
  type: 'UPDATE_PAYMENT',
  payment
})

export const updateTickets = (tickets) => ({
  type: 'UPDATE_TICKETS',
  tickets
})

export const updateQuantities = (quantities) => ({
  type: 'UPDATE_QUANTITIES',
  quantities
})
