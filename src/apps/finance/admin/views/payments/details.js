import { Audit, Button, List, Comments } from '@admin'
import Receipt from '../../components/receipt'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

const Details = ({ audits, payment }) => {

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

    const credit = {
      className: 'link',
      label: `${payment.credit.id} (${payment.credit.description})`,
      route: `/admin/finance/customers/${payment.invoice.customer.id}/credits/${payment.credit.id}`
    }

    items.push({ label: 'Credit', content: <Button { ...credit } /> })

  } else if(_.includes(['card','googlepay','applepay','paypal','ach'], payment.method)) {

    if(payment.method === 'ach') {
      items.push({ label: 'Bank Account', content: payment.description })
    } else if(payment.method === 'paypal') {
      items.push({ label: 'Email', content: payment.description })
    } else {
      items.push({ label: 'Card', content: payment.description })
    }

    items.push({ label: 'Bank', content: payment.bank.title })

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

  if(payment.bank) {
    items.push({ label: 'Bank Account', content: payment.bank.title })
    items.push({ label: 'Gross Amount', content: numeral(payment.amount).format('0.00') })
    items.push({ label: 'Fee', content: (
      <span>
        { numeral(payment.fee).format('0.00') } (
        { numeral(payment.rate).format('0.00%') }
        { payment.method !== 'ach' ? '+ 0.30' : '' })
      </span>
    ) })
    items.push({ label: 'Net Amount', content: numeral(payment.disbursed).format('0.00') })
  } else {
    items.push({ label: 'Amount', content: numeral(payment.amount).format('0.00') })
  }

  if(payment.refunded) {
    items.push({ label: 'Refunded', content: numeral(payment.refunded).format('0.00') })
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
  } else if(payment.status === 'deposited') {
    list.alert = { color: 'violet', message: 'This payment has been deposited' }
  } else if(payment.status === 'received') {
    list.alert = { color: 'green', message: 'This payment was received' }
  }

  if(payment.status === 'deposited') {

    const deposit = {
      className: 'link',
      label: moment(payment.deposit.date).format('MM/DD/YYYY'),
      route: `/admin/finance/deposits/${payment.deposit.id}`
    }

    list.sections.push({
      title: 'Deposited',
      items: [
        { label: 'Bank Account', content: payment.deposit.bank.title },
        { label: 'Date', content: <Button { ...deposit } /> }
      ]
    })

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

  list.sections.push({
    items: [
      { component: <Audit entries={ audits } /> }
    ]
  })

  list.footer = <Comments entity={`finance_payments/${payment.id}`} />

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  payment: PropTypes.object
}

export default Details
