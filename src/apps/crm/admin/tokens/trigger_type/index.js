import PropTypes from 'prop-types'
import React from 'react'

const types = {
  response: 'check-square',
  open: 'envelope-open',
  click: 'mouse-pointer',
  list: 'th-list',
  topic: 'lightbulb-o',
  property: 'id-card',
  manual: 'plus',
  event: 'calendar'
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
