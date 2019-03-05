import PropTypes from 'prop-types'
import React from 'react'

const CompactTypeToken = ({ value }) => (
  <div className="compact-type-token">
    <div className={`type-token-badge ${value}`}>
      { value === 'advance' && <i className="fa fa-fw fa-arrow-right" /> }
      { value === 'check' && <i className="fa fa-fw fa-check" /> }
      { value === 'expense' && <i className="fa fa-fw fa-credit-card" /> }
      { value === 'reimbursement' && <i className="fa fa-fw fa-dollar" /> }
      { value === 'trip' && <i className="fa fa-fw fa-car" /> }
      { value === 'import' && <i className="fa fa-fw fa-table" /> }
    </div>
  </div>
)

CompactTypeToken.propTypes = {
  value: PropTypes.string
}

export default CompactTypeToken
