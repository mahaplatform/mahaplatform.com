import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const Details = ({ disbursement }) => {

  const list = {
    items: [
      { label: 'Date', content: moment(disbursement.date).format('MM/DD/YYYY') },
      { label: 'Bank Account', content: disbursement.merchant.title },
      { label: 'Total', content: numeral(disbursement.total).format('$0.00') },
      { label: 'Fees', content: numeral(disbursement.fees).format('$0.00') },
      { label: 'Amount', content: numeral(disbursement.amount).format('$0.00') }
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  disbursement: PropTypes.object
}

export default Details
