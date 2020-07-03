import { createSelector } from 'reselect'

const products = (state, props) => state.products

export const value = createSelector(
  products,
  (products) => products.map(product => ({
    code: product.code,
    project_id: product.project_id,
    revenue_type_id: product.revenue_type_id,
    description: product.description,
    price: product.price,
    tax_rate: product.tax_rate
  }))
)
