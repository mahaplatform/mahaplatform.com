import { Audit, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, product }) => {


  const config = {
    sections: [
      {
        items: [
          { label: 'Title', content: product.title }
        ]
      }
    ]
  }

  config.sections.push({
    items: [
      { component: <Audit entries={ audits } /> }
    ]
  })

  config.footer = <Comments entity={`stores_products/${product.id}`} />

  return <List { ...config } />

}

Details.propTypes = {
  audits: PropTypes.array,
  product: PropTypes.object
}

export default Details
