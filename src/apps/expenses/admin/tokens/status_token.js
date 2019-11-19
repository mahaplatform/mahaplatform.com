import PropTypes from 'prop-types'
import Status from './status'
import React from 'react'

const StatusToken = ({ value }) => (
  <div className="token">
    <Status status={ value } />
  </div>
)

StatusToken.propTypes = {
  text: PropTypes.string
}

export default StatusToken
