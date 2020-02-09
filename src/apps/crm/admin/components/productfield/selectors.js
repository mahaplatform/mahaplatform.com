import { createSelector } from 'reselect'

const products = (state, props) => state.products

export const value = createSelector(
  products,
  (products) => products.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    tax_rate: product.tax_rate
  }))
)
