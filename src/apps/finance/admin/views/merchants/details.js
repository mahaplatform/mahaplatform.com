import PropTypes from 'prop-types'
import { List } from 'maha-admin'
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

  return <List { ...list } />

}

Details.propTypes = {
  merchant: PropTypes.object
}

export default Details
