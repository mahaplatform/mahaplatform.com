import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ channel }) => (
  <div>
    { channel }
  </div>
)

Token.propTypes = {
  channel: PropTypes.string
}

export default Token
