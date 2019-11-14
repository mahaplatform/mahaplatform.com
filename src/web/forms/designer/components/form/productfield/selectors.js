import { createSelector } from 'reselect'

const given = (state, props) => props.products

const quantities = (state, props) => state.quantities

export const products = createSelector(
  given,
  quantities,
  (products, quantities) => products.map(product => {
    const quantity = quantities[product.code] || 0
    return {
      ...product,
      quantity,
      total: quantity * product.price
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
    return tax + (product.total * product.tax)
  }, 0.00))

export const total = createSelector(
  subtotal,
  tax,
  (subtotal, tax) => subtotal + tax)

export const value = createSelector(
  products,
  subtotal,
  tax,
  total,
  (products, subtotal, tax, total) => ({
    products: products.filter(product => product.quantity > 1).map(product => ({
      quantity: product.quantity,
      tax: product.tax,
      price: product.price
    })),
    subtotal,
    tax,
    total
  }))
