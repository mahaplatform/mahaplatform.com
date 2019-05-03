import PropTypes from 'prop-types'
import Status from './status'
import React from 'react'

const StatusToken = ({ text }) => (
  <div className="token">
    <Status status={ text } />
  </div>
)

StatusToken.propTypes = {
  text: PropTypes.string
}

export default StatusToken
