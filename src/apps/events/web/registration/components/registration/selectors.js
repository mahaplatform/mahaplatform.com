import { createSelector } from 'reselect'

const ticket_types = (state, props) => props.event.ticket_types

const quantities = (state, props) => state.quantities

export const items = createSelector(
  ticket_types,
  quantities,
  (ticket_types, quantities) => ticket_types.filter(ticket_type => {
    return quantities[ticket_type.id]
  }).map(ticket_type => {
    const quantity = quantities[ticket_type.id] || 0
    const price = ticket_type.fixed_price
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
