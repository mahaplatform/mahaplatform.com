import PropTypes from 'prop-types'
import React from 'react'

const SenderToken = ({ rfc822 }) => (
  <div className="sender-token">
    <div className="sender-token-label">
      { rfc822 }
    </div>
  </div>
)

SenderToken.propTypes = {
  rfc822: PropTypes.string
}

export default SenderToken
