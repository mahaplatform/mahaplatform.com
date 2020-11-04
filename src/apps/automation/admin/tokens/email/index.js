import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import React from 'react'

const EmailToken = ({ display_name, program, type }) => (
  <div className="crm-email-token">
    <div className="crm-email-token-logo">
      <Logo team={ program } width="24" />
    </div>
    <div className="crm-email-token-label">
      { display_name }
    </div>
  </div>
)

EmailToken.propTypes = {
  display_name: PropTypes.string,
  program: PropTypes.object,
  type: PropTypes.string
}

export default EmailToken
