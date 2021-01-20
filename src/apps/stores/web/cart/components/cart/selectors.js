import { createSelector } from 'reselect'

const products = (state, props) => props.products

const cart = (state, props) => state.cart

export const variants = createSelector(
  products,
  (products) => products.reduce((products, product) => [
    ...products,
    ...product.variants.reduce((variants, variant) => [
      ...variants,
      {
        title: product.title,
        categories: product.categories.map(category => category.title).join(','),
        description: product.description,
        thumbnail: variant.photos[0] ? variant.photos[0].asset : null,
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

export const shipping = createSelector(
  items,
  (items) => items.filter(item => {
    return item.shipping_strategy === 'flat'
  }).reduce((shipping, item) => {
    return shipping + (Number(item.quantity) * Number(item.shipping_fee))
  }, 0.00)
)

export const subtotal = createSelector(
  items,
  shipping,
  (items, shipping) => items.reduce((subtotal, item) => {
    return subtotal + (Number(item.quantity) * Number(item.price))
  }, shipping)
)

export const tax = createSelector(
  items,
  (items) =>
    items.reduce((tax, item) => {
      return tax + (Number(item.quantity) * Number(item.price) * Number(item.tax_rate))
    }, 0.00) +
    items.reduce((tax, item) => {
      return tax + (Number(item.quantity) * Number(item.shipping_fee) * Number(item.tax_rate))
    }, 0.00)
)

export const total = createSelector(
  subtotal,
  tax,
  (subtotal, tax) => subtotal + tax
)
