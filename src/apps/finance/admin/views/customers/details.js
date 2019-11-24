import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'


const Details = ({ customer }) => {

  const list = {
    items: [
      { label: 'Name', content: customer.display_name },
      { label: 'Email', content: customer.email },
      { label: 'Phone', content: customer.phone },
      { label: 'Address', content: customer.address }
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  customer: PropTypes.object
}

export default Details
