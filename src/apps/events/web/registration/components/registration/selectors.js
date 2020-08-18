import { createSelector } from 'reselect'

const ticket_types = (state, props) => props.event.ticket_types

const quantities = (state, props) => state.quantities

const contact = (state, props) => state.contact

const tickets = (state, props) => state.tickets

const event = (state, props) => props.event

export const items = createSelector(
  ticket_types,
  quantities,
  (ticket_types, quantities) => ticket_types.filter(ticket_type => {
    return quantities[ticket_type.id] && quantities[ticket_type.id].quantity > 0
  }).map(ticket_type => {
    const { quantity, price } = quantities[ticket_type.id]
    return {
      ticket_type_id: ticket_type.id,
      name: ticket_type.name,
      quantity,
      price,
      total: quantity * Number(price)
    }
  })
)

export const subtotal = createSelector(
  items,
  (items) => items.reduce((subtotal, item) => {
    return subtotal + item.total
  }, 0.00)
)

export const tax = createSelector(
  items,
  (items) => 0
)

export const discount = createSelector(
  items,
  (items) => 0
)

export const total = createSelector(
  subtotal,
  (subtotal) => subtotal
)

export const data = createSelector(
  contact,
  event,
  items,
  quantities,
  tickets,
  (contact, event, items, quantities, tickets) => ({
    contact,
    items,
    ipaddress: event.ipaddress,
    quantities,
    referer: event.referer,
    starttime: event.starttime,
    tickets
  })
)
