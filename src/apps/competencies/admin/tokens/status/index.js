import PropTypes from 'prop-types'
import React from 'react'

const StatusToken = ({ status }) => (
  <div className={`plan-token-status ${ status }`}>
    { status }
  </div>
)

StatusToken.propTypes = {
  status: PropTypes.string
}

export default StatusToken
