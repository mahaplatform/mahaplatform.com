import PropTypes from 'prop-types'
import { Button, List } from 'maha-admin'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

const Details = ({ payment }) => {

  const invoice = {
    className: 'link',
    label: payment.invoice.code,
    route: `/admin/finance/invoices/${payment.invoice.id}`
  }

  const items = [
    { label: 'Customer', content: payment.invoice.customer.display_name },
    { label: 'Invoice', content: <Button { ...invoice } /> },
    { label: 'Date', content: moment(payment.date).format('MM/DD/YYYY') },
    { label: 'Method', content: payment.method }
  ]

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

  if(payment.refunded) {
    items.push({ label: 'Refunded', content: numeral(payment.refunded).format('$0.00') })
  }

  const list = {
    sections: [
      { items }
    ]
  }

  if(payment.voided_date !== null) {
    list.alert = { color: 'red', message: 'This payment was voided' }
  } else if(payment.status === 'captured') {
    list.alert = { color: 'teal', message: 'This payment is pending settlement' }
  } else if(payment.status === 'settled') {
    list.alert = { color: 'blue', message: 'This payment has been settled' }
  } else if(payment.status === 'disbursed') {
    list.alert = { color: 'green', message: 'This payment has been disbursed' }
  } else if(payment.status === 'received') {
    list.alert = { color: 'green', message: 'This payment was received' }
  }

  if(payment.status === 'voided') {
    list.sections.push({
      title: 'Voided',
      items: [
        { label: 'Date', content: moment(payment.voided_date).format('MM/DD/YYYY') },
        { label: 'Reason', content: payment.voided_reason }
      ]
    })
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
        { label: 'Merchant Account', content: payment.disbursement.merchant.title },
        { label: 'Fee', content: (
          <span>{ numeral(payment.fee).format('$0.00') } ({ numeral(payment.rate).format('0.00%') } + 0.30)</span>
        ) }
      ]
    })

  }

  return <List { ...list } />

}

Details.propTypes = {
  payment: PropTypes.object
}

export default Details
