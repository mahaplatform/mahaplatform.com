import PropTypes from 'prop-types'
import React from 'react'

const SenderToken = ({ rfc822, is_verified }) => (
  <div className="sender-token">
    <div className="sender-token-label">
      { rfc822 }
    </div>
    <div className="sender-token-extra">
      { is_verified ?
        <span className="success">VERIFIED</span> :
        <span className="error">NOT VERIFIED</span>
      }
    </div>
  </div>
)

SenderToken.propTypes = {
  rfc822: PropTypes.string,
  is_verified: PropTypes.bool
}

export default SenderToken
