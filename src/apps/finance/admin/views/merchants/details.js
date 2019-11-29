import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import Signup from './signup'
import React from 'react'

const Details = ({ merchant }) => {

  const list = {
    items: [
      { label: 'Title', content: merchant.title },
      { label: 'Bank Name', content: merchant.bank_name },
      { label: 'Routing Number', content: merchant.routing_number },
      { label: 'Account Number', content: merchant.account_number },
      { label: 'PayPal', content: merchant.has_paypal, format: 'check_times' }
    ]
  }

  if(!merchant.braintree_id) {
    list.items.unshift({ component: <Signup merchant={ merchant }/> })
  }

  return <List { ...list } />

}

Details.propTypes = {
  merchant: PropTypes.object
}

export default Details
