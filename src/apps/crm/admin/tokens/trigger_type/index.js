import PropTypes from 'prop-types'
import React from 'react'

const types = {
  form_submission: 'check-square',
  email_open: 'envelope-open',
  email_click: 'mouse-pointer',
  manual_enrollment: 'user'
}

const TriggerTypeToken = ({ value }) => (
  <div className="crm-trigger-type-token">
    <div className={`crm-trigger-type-token-icon ${value}`}>
      <i className={`fa fa-${types[value]}`} />
    </div>
  </div>
)

TriggerTypeToken.propTypes = {
  value: PropTypes.string
}

export default TriggerTypeToken
