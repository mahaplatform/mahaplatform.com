import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

const Details = ({ payment }) => {

  const list = {
    items: [
      { label: 'Customer', content: payment.customer.display_name },
      { label: 'Date', content: moment(payment.date).format('MM/DD/YYYY') },
      { label: 'Method', content: payment.method }
    ]
  }

  if(payment.voided_at) {
    list.items.push({ label: 'Voided At', content: moment(payment.voided_at).format('MM/DD/YYYY')})
  }

  if(payment.method === 'scholarship') {
    list.items.push({ label: 'Scholarship', content: payment.scholarship.id })
  } else if(payment.method === 'credit') {
    list.items.push({ label: 'Credit', content: payment.credit.id })
  } else if(_.include(['card','googlepay','applepay'], payment.method)) {
    list.items.push({ label: 'Card', content: payment.card })
    list.items.push({ label: 'Braintree ID', content: payment.braintree_id })
  }

  list.items.push({ label: 'Amount', content: numeral(payment.amount).format('0.00') })

  return <List { ...list } />

}

Details.propTypes = {
  payment: PropTypes.object
}

export default Details
