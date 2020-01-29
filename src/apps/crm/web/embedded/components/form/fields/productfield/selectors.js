import { createSelector } from 'reselect'

const given = (state, props) => props.products

const quantities = (state, props) => state.quantities

export const products = createSelector(
  given,
  quantities,
  (products, quantities) => products.map(product => {
    const quantity = quantities[product.id] || 0
    return {
      ...product,
      quantity,
      total: quantity * Number(product.price)
    }
  }))

export const subtotal = createSelector(
  products,
  (products) => products.reduce((subtotal, product) => {
    return subtotal + product.total
  }, 0.00))

export const tax = createSelector(
  products,
  (products) => products.reduce((tax, product) => {
    return tax + (tax ? product.total * product.tax : 0)
  }, 0.00))

export const total = createSelector(
  subtotal,
  tax,
  (subtotal, tax) => subtotal + tax)

const filtered = createSelector(
  products,
  (products) => products.filter(product => {
    return product.quantity > 0
  }).map(product => ({
    product_id: product.id,
    title: product.title,
    quantity: product.quantity,
    tax_rate: product.tax_rate,
    price: product.price,
    total: product.total
  })))

export const value = createSelector(
  filtered,
  subtotal,
  tax,
  total,
  (products, subtotal, tax, total) => ({
    products,
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2)
  }))
