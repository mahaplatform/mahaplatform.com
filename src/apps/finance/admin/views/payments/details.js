import Receipt from '../../components/receipt'
import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
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

  if(payment.method === 'scholarship') {
    items.push({ label: 'Scholarship', content: payment.scholarship.id })
  } else if(payment.method === 'credit') {
    items.push({ label: 'Credit', content: payment.credit.id })
  } else if(_.includes(['card','googlepay','applepay','paypal','ach'], payment.method)) {

    if(payment.method === 'ach') {
      items.push({ label: 'Bank Account', content: payment.description })
    } else if(payment.method === 'paypal') {
      items.push({ label: 'Email', content: payment.description })
    } else {
      items.push({ label: 'Card', content: payment.description })
    }

    items.push({ label: 'Merchant', content: payment.merchant.title })

  }

  if(payment.braintree_id) {

    const braintree = {
      className: 'link',
      label: payment.braintree_id,
      link: payment.braintree_link
    }

    items.push({ label: 'Braintree ID', content: <Button { ...braintree } /> })

  }

  if(payment.paypal_id) {

    const paypal = {
      className: 'link',
      label: payment.paypal_id,
      link: payment.paypal_link
    }

    items.push({ label: 'PayPal ID', content: <Button { ...paypal } /> })

  }

  items.push({ label: 'Amount', content: numeral(payment.amount).format('$0.00') })

  if(payment.refunded) {
    items.push({ label: 'Refunded', content: numeral(payment.refunded).format('$0.00') })
  }

  if(payment.merchant) {
    items.push({ label: 'Merchant Account', content: payment.merchant.title })
    items.push({ label: 'Fee', content: (
      <span>{ numeral(payment.fee).format('$0.00') } ({ numeral(payment.rate).format('0.00%') } + 0.30)</span>
    ) })
  }

  const list = {
    sections: [
      { items }
    ]
  }

  if(payment.method === 'check' && payment.photo) {
    const value = { asset_id: payment.photo.id, ...payment.photo }
    list.sections[0].items.unshift({ component: <Receipt preview={ false } value={ value } /> })
    list.header = <Receipt preview={ true } value={ value } />
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
      ]
    })

  }

  return <List { ...list } />

}

Details.propTypes = {
  payment: PropTypes.object
}

export default Details
