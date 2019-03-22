import PropTypes from 'prop-types'
import React from 'react'

const ExpenseToken = ({ description, integration, title }) => (
  <div className="token expense-type-token">
    { integration && integration.expense_code && <strong>{ integration.expense_code  } - </strong> }
    { title }<br />
    <div className="expense-type-token-description">
      { description }
    </div>
  </div>
)

ExpenseToken.propTypes = {
  description: PropTypes.string,
  integration: PropTypes.string,
  title: PropTypes.string
}

export default ExpenseToken
