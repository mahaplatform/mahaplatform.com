import PropTypes from 'prop-types'
import React from 'react'

const Status = ({ status, value }) => (
  <span className={`expense-item-status ${ status || value }`}>
    { status || value }
  </span>
)

Status.propTypes = {
  status: PropTypes.string,
  value: PropTypes.string
}

export default Status
