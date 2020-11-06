import { Button, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ customer }) => {

  const list = {
    items: [
      { label: 'Name', content: customer.display_name },
      { label: 'Email', content: customer.email },
      { label: 'Phone', content: customer.phone, format: 'phone' },
      { label: 'Address', content: customer.address ? customer.address.description : '' }
    ]
  }

  if(customer.braintree_id) {

    const braintree = {
      className: 'link',
      label: customer.braintree_id,
      link: customer.braintree_link
    }

    list.items.push({ label: 'Braintree ID', content: <Button { ...braintree } /> })

  }

  return <List { ...list } />

}

Details.propTypes = {
  customer: PropTypes.object
}

export default Details
