import TriggerType from '../trigger_type'
import PropTypes from 'prop-types'
import React from 'react'

const triggers = {
  response: {
    icon: 'check-square',
    title: 'Form Submission',
    description: 'Enroll contacts when they submit a form reponse'
  },
  open: {
    icon: 'envelope-open',
    title: 'Email Open',
    description: 'Enroll contacts when they open en email'
  },
  click: {
    icon: 'mouse-pointer',
    title: 'Email Click',
    description: 'Enroll contacts when they click a link in an email'
  },
  manual: {
    icon: 'user',
    title: 'Manual Enrollment',
    description: 'Enroll contacts manually on an ongoing basis'
  },
  list: {
    icon: 'th-list',
    title: 'List Update',
    description: 'Enroll contact when they are added to a list'
  },
  topic: {
    icon: 'book',
    title: 'Topic Update',
    description: 'Enroll contact when they are added to a topic'
  },
  property: {
    icon: 'id-card',
    title: 'Property Update',
    description: 'Enroll contact when a property is changed'
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
