import { createSelector } from 'reselect'
import _ from 'lodash'

const given = (state, props) => state.line_items

export const line_items = createSelector(
  given,
  (line_items) => {
    return line_items.reduce((line_items, line_item) => {
      return [
        ...line_items,
        {
          description: line_item.description,
          quantity: line_item.quantity,
          tax: line_item.tax_rate * line_item.price,
          price: line_item.price,
          total: line_item.quantity * line_item.price
        }
      ]
    }, [])
  }
)

export const subtotal = createSelector(
  line_items,
  (line_items) => line_items.reduce((subtotal, line_item) => {
    return subtotal + line_item.total
  }, 0.00))

export const tax = createSelector(
  line_items,
  (line_items) => line_items.reduce((tax, line_item) => {
    return tax + (line_item.tax * line_item.quantity)
  }, 0.00))


export const total = createSelector(
  subtotal,
  tax,
  (subtotal, tax) => subtotal + tax)

export const value = createSelector(
  given,
  (line_items) => ({
    line_items
  }))
