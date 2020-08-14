import { createSelector } from 'reselect'

const cart = (state, props) => state.cart

const products = (state, props) => state.products

export const variants = createSelector(
  products,
  (products) => products.reduce((products, product) => [
    ...products,
    ...product.variants.reduce((variants, variant) => [
      ...variants,
      {
        title: product.title,
        description: product.description,
        ...variant
      }
    ], [])
  ], [])
)

export const items = createSelector(
  cart,
  variants,
  (cart, variants) => cart ? cart.items.map(item => ({
    ...item,
    ...variants.find(variant => {
      return variant.code === item.code
    })
  })) : []
)

export const subtotal = createSelector(
  items,
  (items) => items.reduce((subtotal, item) => {
    return subtotal + (Number(item.quantity) * Number(item.price))
  }, 0.00)
)

export const tax = createSelector(
  items,
  (items) => items.reduce((tax, item) => {
    return tax + (Number(item.quantity) * Number(item.price) * Number(item.tax_rate))
  }, 0.00)
)

export const total = createSelector(
  subtotal,
  tax,
  (subtotal, tax) => subtotal + tax
)
