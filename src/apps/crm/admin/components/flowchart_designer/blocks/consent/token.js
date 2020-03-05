import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ channel_type }) => (
  <div>
    { channel_type }
  </div>
)

Token.propTypes = {
  channel_type: PropTypes.string
}

export default Token
