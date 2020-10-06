import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ bank }) => {

  const list = {
    items: [
      { label: 'Title', content: bank.title },
      { label: 'Bank Name', content: bank.bank_name },
      { label: 'Routing Number', content: bank.routing_number },
      { label: 'Account Number', content: bank.account_number },
      { label: 'Applied On', content: bank.applied_on, format: 'date' },
      { label: 'PayPal', content: bank.has_paypal, format: 'yes_no' }
    ]
  }

  if(bank.braintree_id) {

    const braintree = {
      label: bank.braintree_id,
      className: 'link',
      link: bank.braintree_link
    }

    list.items.push({ label: 'Braintree ID', content: <Button { ...braintree} /> })

  }

  return <List { ...list } />

}

Details.propTypes = {
  bank: PropTypes.object
}

export default Details
