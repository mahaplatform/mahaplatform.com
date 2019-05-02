import Status from '../status'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

const AdvanceToken = (withUser) => (advance) => (
  <div className="expense-item-token">
    <div className="expense-item-token-details">
      <small><em>{ moment(advance.date_needed).format('MM/DD/YYYY') }</em></small><br />
      { withUser ? <strong>{ advance.user.full_name  }<br /></strong> : '' }
      { advance.description }<br />
      <h2>{ numeral(advance.amount).format('$0.00') }</h2>
    </div>
    <div className="expense-item-token-badge">
      <Status { ...advance } />
    </div>
  </div>
)

export default AdvanceToken
