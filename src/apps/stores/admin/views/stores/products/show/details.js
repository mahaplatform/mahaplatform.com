import { Audit, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, product }) => {

  const config = {}

  if(product.deleted_at !== null) {
    config.alert = { color: 'red', message: 'This store was deleted' }
  }

  config.sections = [
    {
      items: [
        { label: 'Title', content: product.title },
        { label: 'Category', content: product.category.title }
      ]
    },{
      items: [
        { component: <Audit entries={ audits } /> }
      ]
    }
  ]

  config.footer = <Comments entity={`stores_products/${product.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  product: PropTypes.object
}

export default Details
