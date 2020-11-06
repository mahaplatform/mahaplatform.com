import PropTypes from 'prop-types'
import { Button, List } from '@admin'
import Braintree from './braintree'
import React from 'react'

const Details = ({ bank, integration }) => {

  const list = {
    items: [
      { label: 'Title', content: bank.title },
      { label: 'Bank Name', content: bank.bank_name },
      { label: 'Routing Number', content: bank.routing_number },
      { label: 'Account Number', content: bank.account_number }
    ]
  }

  if(bank.braintree_id) {

    const braintree = {
      label: bank.braintree_id,
      className: 'link',
      link: bank.braintree_link
    }

    list.items.push({ label: 'Braintree ID', content: <Button { ...braintree} /> })
    list.items.push({ label: 'Credit Card Rate', content: bank.rate, format: 'percent' })
    list.items.push({ label: 'Amex Rate', content: bank.amex_rate , format: 'percent'})
    list.items.push({ label: 'ACH Rate', content: bank.ach_rate, format: 'percent' })
    list.items.push({ label: 'PayPal', content: bank.has_paypal, format: 'yes_no' })

  } else {
    list.items.unshift({ component: <Braintree bank={ bank }/> })
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
  integration: PropTypes.string
}

export default Details
