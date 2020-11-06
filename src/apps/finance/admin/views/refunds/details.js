import { Audit, Button, List, Comments } from '@admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const Details = ({ audits, refund }) => {

  const customer = {
    className: 'link',
    label: refund.payment.customer.display_name,
    route: `/admin/finance/customers/${refund.payment.customer.id}`
  }

  const payment = {
    className: 'link',
    label: refund.payment.reference,
    route: `/admin/finance/payments/${refund.payment.id}`
  }

  const items = [
    { label: 'Date', content: moment(refund.created_at).format('MM/DD/YYYY') },
    { label: 'Customer', content: <Button { ...customer } /> },
    { label: 'Payment', content: <Button { ...payment } /> },
    { label: 'Type', content: refund.type }
  ]

  if(refund.credit) {

    const credit = {
      className: 'link',
      label: `${refund.credit.id} (${refund.credit.description})`,
      route: `/admin/finance/customers/${refund.payment.customer.id}/credits/${refund.credit.id}`
    }

    items.push({ label: 'Credit', content: <Button { ...credit } /> })

  }

  items.push({ label: 'Amount', content: numeral(refund.amount).format('$0.00') })

  if(refund.type === 'card') {

    const braintree = {
      className: 'link',
      label: refund.braintree_id,
      link: refund.braintree_link
    }

    items.push({ label: 'Braintree', content: <Button { ...braintree } /> })

  }

  const list = {
    sections: [
      { items }
    ]
  }

  if(refund.voided_date !== null) {
    list.alert = { color: 'red', message: 'This refund was voided' }
  } else if(refund.status === 'settled') {
    list.alert = { color: 'blue', message: 'This refund has been settled' }
  } else if(refund.status === 'deposited') {
    list.alert = { color: 'violet', message: 'This refund has been deposited' }
  }

  if(refund.status === 'deposited') {

    const deposit = {
      className: 'link',
      label: moment(refund.deposit.date).format('MM/DD/YYYY'),
      route: `/admin/finance/deposits/${refund.deposit.id}`
    }

    list.sections.push({
      title: 'Withdrawn',
      items: [
        { label: 'Bank Account', content: refund.deposit.bank.title },
        { label: 'Date', content: <Button { ...deposit } /> }
      ]
    })

  }

  if(refund.voided_date) {
    list.sections.push({
      title: 'Voided',
      items: [
        { label: 'Date', content: moment(refund.voided_date).format('MM/DD/YYYY') },
        { label: 'Reason', content: refund.voided_reason }
      ]
    })
  }

  list.sections.push({
    items: [
      { component: <Audit entries={ audits } /> }
    ]
  })

  list.footer = <Comments entity={`finance_refunds/${refund.id}`} />

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  refund: PropTypes.object
}

export default Details
