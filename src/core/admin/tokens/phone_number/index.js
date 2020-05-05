import Logo from '../../components/logo'
import PropTypes from 'prop-types'
import React from 'react'

const PhoneNumberToken = ({ formatted, program }) => (
  <div className="phone-number-token">
    <div className="phone-number-token-logo">
      <Logo team={ program } width="24" />
    </div>
    <div className="phone-number-token-label">
      { program.title } { formatted }
    </div>
  </div>
)

PhoneNumberToken.propTypes = {
  formatted: PropTypes.string,
  program: PropTypes.object
}

export default PhoneNumberToken
