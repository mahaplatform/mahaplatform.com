import { createSelector } from 'reselect'

const given = (state, props) => state.line_items

const coupons = (state, props) => state.coupons

const products = (state, props) => state.products

const coupon = (state, props) => state.coupon

export const status = createSelector(
  coupons,
  products,
  (coupons, products) => {
    if(coupons.status === 'loading' || coupons.status === 'loading') {
      return 'loading'
    } else if(coupons.status === 'failure' || coupons.status === 'failure') {
      return 'failure'
    } else if(coupons.status === 'success' && coupons.status === 'success') {
      return 'success'
    } else {
      return 'pending'
    }
  })

export const line_items = createSelector(
  given,
  (line_items) => line_items.map(line_item => {
    return {
      ...line_item,
      total: line_item.quantity * line_item.price
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
    return tax + (line_item.total * line_item.tax_rate)
  }, 0.00))

export const discount = createSelector(
  coupon,
  subtotal,
  (coupon, subtotal) => {
    if(!coupon) {
      return 0.00
    } else if(coupon.percent) {
      return subtotal * coupon.percent
    } else if(coupon.amount) {
      return coupon.amount
    }
  })

export const total = createSelector(
  subtotal,
  tax,
  discount,
  (subtotal, tax, discount) => subtotal + tax - discount)


export const value = createSelector(
  line_items,
  (line_items) => line_items.map(line_item => ({
    product_id: line_item.product.id,
    quantity: line_item.quantity,
    price: line_item.price,
    tax_rate: line_item.tax_rate
  })))
