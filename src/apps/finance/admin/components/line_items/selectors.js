import { createSelector } from 'reselect'
import _ from 'lodash'

const given = (state, props) => state.line_items

const coupons = (state, props) => state.coupons

const coupon_id = (state, props) => state.coupon_id

export const coupon = createSelector(
  coupons,
  coupon_id,
  (coupons, coupon_id) => _.find(coupons.records, { id: coupon_id }) || null
)

export const status = createSelector(
  coupons,
  (coupons) => {
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
  coupon,
  (line_items, coupon) => {
    return line_items.reduce((line_items, line_item) => {
      return [
        ...line_items,
        {
          description: line_item.description,
          quantity: line_item.quantity,
          discount: coupon ? (coupon.percent ? Math.round((coupon.percent * line_item.price) * 100) / 100 : coupon.amount) : 0.00,
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


export const discount = createSelector(
  line_items,
  (line_items) => line_items.reduce((discount, line_item) => {
    return discount + line_item.discount
  }, 0.00))

export const total = createSelector(
  subtotal,
  tax,
  discount,
  (subtotal, tax, discount) => subtotal + tax - discount)

export const value = createSelector(
  coupon_id,
  given,
  (coupon_id, line_items) => ({
    coupon_id,
    line_items
  }))
