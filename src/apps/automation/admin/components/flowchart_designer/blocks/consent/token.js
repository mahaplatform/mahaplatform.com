import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ action, channel_type }) => (
  <div>
    { action === 'add' ? `Opt in to ${channel_type} channel` : `Opt out of ${channel_type} channel` }
  </div>
)

Token.propTypes = {
  action: PropTypes.string,
  channel_type: PropTypes.string
}

export default Token
