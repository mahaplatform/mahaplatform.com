import PropTypes from 'prop-types'
import { Button, List } from 'maha-admin'
import Braintree from './braintree'
import React from 'react'

const Details = ({ merchant, integration }) => {

  const list = {
    items: [
      { component: <Braintree merchant={ merchant }/> },
      { label: 'Title', content: merchant.title },
      { label: 'Bank Name', content: merchant.bank_name },
      { label: 'Routing Number', content: merchant.routing_number },
      { label: 'Account Number', content: merchant.account_number },
      { label: 'PayPal', content: merchant.has_paypal, format: 'check_times' }
    ]
  }

  if(merchant.braintree_id) {

    const braintree = {
      label: merchant.braintree_id,
      className: 'link',
      link: merchant.braintree_link
    }

    list.items.push({ label: 'Braintree ID', content: <Button { ...braintree} /> })

  }

  if(integration === 'accpac') {
    list.items = list.items.concat([
      { label: 'Bank Code', content: merchant.integration.bank_code }
    ])
  }

  return <List { ...list } />

}

Details.propTypes = {
  merchant: PropTypes.object,
  integration: PropTypes.object
}

export default Details
