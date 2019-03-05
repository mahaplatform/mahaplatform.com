import PropTypes from 'prop-types'
import React from 'react'

const Status = ({ status }) => (
  <span className={`expense-item-status ${ status }`}>
    { status }
  </span>
)

Status.propTypes = {
  status: PropTypes.string
}

export default Status
