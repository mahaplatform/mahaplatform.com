import TriggerType from '../trigger_type'
import PropTypes from 'prop-types'
import React from 'react'

const triggers = {
  form_submission: {
    icon: 'check-square',
    title: 'Form Submission',
    description: 'Enroll contacts when they submit a form reponse'
  },
  email_open: {
    icon: 'envelope-open',
    title: 'Email Open',
    description: 'Enroll contacts when they open en email'
  },
  email_click: {
    icon: 'mouse-pointer',
    title: 'Email Click',
    description: 'Enroll contacts when they click a link in an email'
  },
  manual_enrollment: {
    icon: 'user',
    title: 'Manual Enrollment',
    description: 'Enroll contacts manually on an ongoing basis'
  }
}

const TriggerToken = ({ value }) => {
  const trigger = triggers[value]
  return (
    <div className="crm-trigger-token">
      <TriggerType value={ value } />
      <div className="crm-trigger-token-label">
        <strong>{ trigger.title }</strong><br />
        { trigger.description }
      </div>
    </div>
  )
}

TriggerToken.propTypes = {
  value: PropTypes.string
}

export default TriggerToken
