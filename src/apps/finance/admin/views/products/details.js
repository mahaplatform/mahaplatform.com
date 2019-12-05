import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ product }) => {

  const list = {
    items: [
      { label: 'Title', content: product.title },
      { label: 'Price', content: product.price },
      { label: 'Tax Rate', content: product.tax_rate },
      { label: 'Project', content: product.project.title },
      { label: 'Revenue Type', content: product.revenue_type.title }

    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  product: PropTypes.object
}

export default Details
