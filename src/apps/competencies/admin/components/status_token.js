import PropTypes from 'prop-types'
import React from 'react'

const StatusToken = ({ plan }) => (
  <div className={`plan-token-status ${plan.status.toLowerCase()}`}>
    { plan.status.toUpperCase() }
  </div>
)

StatusToken.propTypes = {
  plan: PropTypes.object
}

export default StatusToken
