import PropTypes from 'prop-types'
import React from 'react'

const TypeToken = ({ value }) => (
  <div className="type-token">
    <div className={`type-token-badge ${value}`}>
      { value === 'Cash Advance' && <i className="fa fa-fw fa-arrow-right" /> }
      { value === 'Check Request' && <i className="fa fa-fw fa-check" /> }
      { value === 'Expense' && <i className="fa fa-fw fa-credit-card" /> }
      { value === 'Reimbursement' && <i className="fa fa-fw fa-dollar" /> }
      { value === 'Mileage' && <i className="fa fa-fw fa-car" /> }
    </div>
    { value }
  </div>
)

TypeToken.propTypes = {
  value: PropTypes.string
}

export default TypeToken
