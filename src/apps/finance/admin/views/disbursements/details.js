import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Details = ({ disbursement }) => {

  const list = {
    items: [
      { label: 'Date', content: disbursement.date, format: 'date' },
      { label: 'Merchant Account', content: disbursement.merchant.title },
      { label: 'Total', content: disbursement.total, format: 'currency' },
      { label: 'Fee', content: disbursement.fee, format: 'currency' },
      { label: 'Amount', content: disbursement.amount, format: 'currency' }
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  disbursement: PropTypes.object
}

export default Details
