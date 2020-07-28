import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const Details = ({ credit }) => {

  const customer = {
    className: 'link',
    label: credit.customer.display_name,
    route: `/admin/finance/customers/${credit.customer.id}`
  }

  const list = {
    items: [
      { label: 'Customer', content: <Button { ...customer } /> },
      { label: 'Program', content: credit.program.title },
      { label: 'Amount', content: numeral(credit.amount).format('0.00') },
      { label: 'Balance', content: numeral(credit.balance).format('0.00') }
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  credit: PropTypes.object,
  payments: PropTypes.array
}

export default Details
