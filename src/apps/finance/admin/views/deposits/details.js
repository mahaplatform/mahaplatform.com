import { Audit, List, Comments } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, deposit }) => {

  const list = {
    items: [
      { label: 'Date', content: deposit.date, format: 'date' },
      { label: 'Bank Account', content: deposit.bank.title },
      { label: 'Total', content: deposit.total, format: 'currency' },
      { label: 'Fee', content: deposit.fee, format: 'currency' },
      { label: 'Amount', content: deposit.amount, format: 'currency' },
      { component: <Audit entries={ audits } /> }
    ]
  }

  if(deposit.status === 'pending') {
    list.alert = { color: 'teal', message: 'This deposit is pending export' }
  } else if(deposit.status === 'exported') {
    list.alert = { color: 'violet', message: 'This deposit was exported' }
  }

  list.footer = <Comments entity={`finance_deposits/${deposit.id}`} />

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  deposit: PropTypes.object
}

export default Details
