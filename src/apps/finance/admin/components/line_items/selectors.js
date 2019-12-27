import { createSelector } from 'reselect'
import _ from 'lodash'

const given = (state, props) => state.line_items

const coupons = (state, props) => state.coupons

const products = (state, props) => state.products.records || []

const coupon_id = (state, props) => state.coupon_id

export const coupon = createSelector(
  coupons,
  coupon_id,
  (coupons, coupon_id) => _.find(coupons.records, { id: coupon_id }) || null
)

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
  products,
  coupon,
  (line_items, products, coupon) => {
    if(products.length === 0) return []
    return line_items.reduce((line_items, line_item) => {
      const product = _.find(products, { id: line_item.product_id })
      if(line_item.price > product.low_price && product.overage_strategy === 'donation') {
        return [
          ...line_items,
          {
            description: line_item.description,
            quantity: line_item.quantity,
            discount: coupon ? (coupon.percent ? Math.round((coupon.percent * line_item.quantity * line_item.low_price) * 100) / 100 : coupon.amount) : 0.00,
            tax: product.tax_rate * line_item.low_price,
            price: product.low_price,
            total: line_item.quantity * product.low_price
          },
          {
            description: `${line_item.description} (amount above base price)`,
            quantity: line_item.quantity,
            discount: 0.00,
            tax: 0.00,
            price: (line_item.price - product.low_price),
            total: line_item.quantity * (line_item.price - product.low_price)
          }
        ]
      }
      return [
        ...line_items,
        {
          description: line_item.description,
          quantity: line_item.quantity,
          discount: coupon ? (coupon.percent ? Math.round((coupon.percent * line_item.price) * 100) / 100 : coupon.amount) : 0.00,
          tax: product.tax_rate * line_item.price,
          price: product.price,
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
    return tax + line_item.tax
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
