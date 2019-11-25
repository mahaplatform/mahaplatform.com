import PropTypes from 'prop-types'
import { Button, List } from 'maha-admin'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

const Details = ({ payment }) => {

  const items = [
    { label: 'Customer', content: payment.customer.display_name },
    { label: 'Date', content: moment(payment.date).format('MM/DD/YYYY') },
    { label: 'Method', content: payment.method }
  ]

  if(payment.voided_at) {
    items.push({ label: 'Voided At', content: moment(payment.voided_at).format('MM/DD/YYYY')})
  }

  const braintree = {
    className: 'link',
    label: payment.braintree_id,
    link: payment.braintree_link
  }

  if(payment.method === 'scholarship') {
    items.push({ label: 'Scholarship', content: payment.scholarship.id })
  } else if(payment.method === 'credit') {
    items.push({ label: 'Credit', content: payment.credit.id })
  } else if(_.includes(['card','googlepay','applepay'], payment.method)) {
    items.push({ label: 'Card', content: payment.description })
    items.push({ label: 'Braintree', content: <Button { ...braintree } /> })
  }

  items.push({ label: 'Amount', content: numeral(payment.amount).format('$0.00') })

  const list = {
    sections: [
      { items }
    ]
  }

  if(payment.status === 'captured') {
    list.alert = { color: 'teal', message: 'This payment is pending settlement' }
  } else if(payment.status === 'settled') {
    list.alert = { color: 'blue', message: 'This payment has been settled' }
  } else if(payment.status === 'disbursed') {
    list.alert = { color: 'green', message: 'This payment has been disbursed' }
  }

  if(payment.status === 'disbursed') {

    const disbursement = {
      className: 'link',
      label: moment(payment.disbursement.date).format('MM/DD/YYYY'),
      route: `/admin/finance/disbursements/${payment.disbursement.id}`
    }

    list.sections.push({
      title: 'Disbursement',
      items: [
        { label: 'Date', content: <Button { ...disbursement } /> },
        { label: 'Bank Account', content: payment.disbursement.merchant.title },
        { label: 'Fee', content: numeral(payment.fee).format('$0.00') }
      ]
    })

  }

  return <List { ...list } />

}

Details.propTypes = {
  payment: PropTypes.object
}

export default Details
