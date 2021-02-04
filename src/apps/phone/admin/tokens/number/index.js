import PropTypes from 'prop-types'
import { Logo } from '@admin'
import React from 'react'

const NumberToken = ({ formatted, program }) => (
  <div className="event-token">
    <div className="event-token-logo">
      <Logo team={ program } width="24" />
    </div>
    <div className="event-token-label">
      { formatted }
    </div>
  </div>
)

NumberToken.propTypes = {
  formatted: PropTypes.string,
  program: PropTypes.object
}

export default NumberToken
