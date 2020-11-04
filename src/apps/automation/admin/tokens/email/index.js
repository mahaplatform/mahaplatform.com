import PropTypes from 'prop-types'
import React from 'react'

const types = {
  form: 'check-square',
  event: 'calendar',
  workflow: 'gear',
  basic: 'envelope-open'
}

const EmailToken = ({ display_name, type }) => (
  <div className="crm-email-token">
    <div className="crm-email-token-type">
      <div className={`crm-email-token-icon ${type}`}>
        <i className={`fa fa-${types[type]}`} />
      </div>
    </div>
    <div className="crm-email-token-label">
      { display_name }
    </div>
  </div>
)

EmailToken.propTypes = {
  display_name: PropTypes.string,
  type: PropTypes.string
}

export default EmailToken
