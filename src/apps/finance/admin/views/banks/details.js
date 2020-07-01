import PropTypes from 'prop-types'
import { Button, List } from 'maha-admin'
import Braintree from './braintree'
import React from 'react'

const Details = ({ bank, integration }) => {

  const list = {
    items: [
      { component: <Braintree bank={ bank }/> },
      { label: 'Title', content: bank.title },
      { label: 'Bank Name', content: bank.bank_name },
      { label: 'Routing Number', content: bank.routing_number },
      { label: 'Account Number', content: bank.account_number },
      { label: 'PayPal', content: bank.has_paypal, format: 'check_times' }
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

  if(integration === 'accpac') {
    list.items = list.items.concat([
      { label: 'Bank Code', content: bank.integration.bank_code }
    ])
  }

  return <List { ...list } />

}

Details.propTypes = {
  bank: PropTypes.object,
  integration: PropTypes.object
}

export default Details
