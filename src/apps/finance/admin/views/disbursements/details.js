import PropTypes from 'prop-types'
import { Audit, List, Comments } from 'maha-admin'
import React from 'react'

const Details = ({ audits, disbursement }) => {

  const list = {
    items: [
      { label: 'Date', content: disbursement.date, format: 'date' },
      { label: 'Merchant Account', content: disbursement.merchant.title },
      { label: 'Total', content: disbursement.total, format: 'currency' },
      { label: 'Fee', content: disbursement.fee, format: 'currency' },
      { label: 'Amount', content: disbursement.amount, format: 'currency' },
      { component: <Audit entries={ audits } /> }
    ]
  }

  if(disbursement.status === 'pending') {
    list.alert = { color: 'teal', message: 'This disbursement is pending' }
  } else if(disbursement.status === 'processed') {
    list.alert = { color: 'violet', message: 'This disbursement was processed' }
  }

  list.footer = <Comments entity={`finance_disbursements/${disbursement.id}`} />

  return <List { ...list } />

}

Details.propTypes = {
  disbursement: PropTypes.object
}

export default Details
