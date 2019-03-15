import PropTypes from 'prop-types'
import Status from './status'
import React from 'react'

const StatusToken = ({ status, value }) => (
  <div className="token">
    <Status status={ status || value } />
  </div>
)

StatusToken.propTypes = {
  status: PropTypes.string,
  value: PropTypes.string
}

export default StatusToken
