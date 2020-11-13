import { createSelector } from 'reselect'

const products = (state, props) => state.products

export const value = createSelector(
  products,
  (products) => products.map(product => ({
    code: product.code,
    project_id: product.project_id,
    revenue_type_id: product.revenue_type_id,
    description: product.description,
    pricing: product.pricing,
    price: product.price,
    tax_rate: product.tax_rate,
    is_sold_out: product.is_sold_out
  }))
)
