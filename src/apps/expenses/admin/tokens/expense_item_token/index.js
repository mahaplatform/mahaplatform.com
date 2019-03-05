import moment from 'moment'
import React from 'react'

const ExpenseToken = (withUser, date) => (item) => (
  <div className="expense-item-token">
    <div className="expense-item-token-details">
      <small><em>{ moment(item[date]).format('MM/DD/YYYY') }</em></small><br />
      { withUser ? <strong>{ item.user.full_name  }<br /></strong> : '' }
      { item.description }
    </div>
  </div>
)

export default ExpenseToken
