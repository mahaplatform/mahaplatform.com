import { createSelector } from 'reselect'

const given = (state, props) => props.products

const quantities = (state, props) => state.quantities

export const line_items = createSelector(
  given,
  quantities,
  (line_items, quantities) => line_items.map(line_item => {
    const quantity = quantities[line_item.code] || 0
    return {
      ...line_item,
      quantity,
      total: quantity * Number(line_item.price)
    }
  }))

export const subtotal = createSelector(
  line_items,
  (line_items) => line_items.reduce((subtotal, line_item) => {
    return subtotal + line_item.total
  }, 0.00))

export const tax = createSelector(
  line_items,
  (line_items) => line_items.reduce((tax, line_item) => {
    return tax + (tax ? line_item.total * line_item.tax : 0)
  }, 0.00))

export const total = createSelector(
  subtotal,
  tax,
  (subtotal, tax) => subtotal + tax)

export const value = createSelector(
  line_items,
  (line_items) => ({
    line_items: line_items.filter(line_item => {
      return line_item.quantity > 0
    }).map(line_item => ({
      code: line_item.code,
      project_id: line_item.project_id,
      revenue_type_id: line_item.revenue_type_id,
      description: line_item.description,
      quantity: line_item.quantity,
      tax_rate: line_item.tax_rate,
      is_tax_deductible: false,
      price: line_item.price,
      total: line_item.total
    }))
  }))
