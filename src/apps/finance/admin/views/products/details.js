import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ product }) => {

  const items = [
    { label: 'Title', content: product.title },
    { label: 'Project', content: product.project.title },
    { label: 'Revenue Type', content: product.revenue_type.title },
    { label: 'Price Type', content: product.price_type }
  ]

  if(product.price_type === 'fixed_price') {
    items.push({ label: 'Fixed Price', content: product.fixed_price })
  } else {
    items.push({ label: 'Low Price', content: product.low_price })
    items.push({ label: 'High Price', content: product.high_price })
    items.push({ label: 'Overage Strategy', content: product.overage_strategy })
    items.push({ label: 'Donation Revenue Type', content: product.donation_revenue_type.title })

  }

  items.push({ label: 'Tax Rate', content: product.tax_rate, format: 'percent' })
  items.push({ label: 'Tax Deducatble?', content: product.is_tax_deductible, format: 'yes_no' })

  const list = { items }

  return <List { ...list } />

}

Details.propTypes = {
  product: PropTypes.object
}

export default Details
