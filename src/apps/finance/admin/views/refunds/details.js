import PropTypes from 'prop-types'
import { Button, List } from 'maha-admin'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const Details = ({ refund }) => {

  const list = {
    items: [
      { label: 'Date', content: moment(refund.created_at).format('MM/DD/YYYY') },
      { label: 'Amount', content: numeral(refund.amount).format('$0.00') }
    ]
  }

  if(refund.voided_at) {
    list.items.push({ label: 'Voided At', content: moment(refund.voided_at).format('MM/DD/YYYY')})
  }

  if(refund.type === 'card') {

    const braintree = {
      className: 'link',
      label: refund.braintree_id,
      link: refund.braintree_link
    }

    list.items.push({ label: 'Braintree', content: <Button { ...braintree } /> })
    list.items.push({ label: 'Status', content: refund.status })
  }

  return <List { ...list } />

}

Details.propTypes = {
  refund: PropTypes.object
}

export default Details
