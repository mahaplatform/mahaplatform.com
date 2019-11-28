import PropTypes from 'prop-types'
import { Button, List } from 'maha-admin'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const Details = ({ refund }) => {

  const payment = {
    className: 'link',
    label: refund.payment.code,
    route: `/admin/finance/payments/${refund.payment.id}`
  }

  const items = [
    { label: 'Date', content: moment(refund.created_at).format('MM/DD/YYYY') },
    { label: 'Customer', content: refund.payment.customer.display_name },
    { label: 'Payment', content: <Button { ...payment } /> },
    { label: 'Type', content: refund.type }
  ]

  if(refund.credit) {

    const credit = {
      className: 'link',
      label: refund.credit.id,
      route: `/admin/finance/credits/${refund.credit.id}`
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
    items.push({ label: 'Status', content: refund.status })
  }

  const list = {
    sections: [
      { items }
    ]
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

  return <List { ...list } />

}

Details.propTypes = {
  refund: PropTypes.object
}

export default Details
