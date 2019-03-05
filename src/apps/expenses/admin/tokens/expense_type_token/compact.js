import PropTypes from 'prop-types'
import React from 'react'

const CompactExpenseTypeToken = ({ expense_type }) => {

  if(!expense_type) return null

  return (
    <div className="compact-expense-type-token">
      { expense_type.integration.expense_code }
      <span> - </span>
      { expense_type.title }
    </div>
  )


}

CompactExpenseTypeToken.propTypes = {
  expense_type: PropTypes.object
}

export default CompactExpenseTypeToken
