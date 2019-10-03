import PropTypes from 'prop-types'
import React from 'react'

const options = {
  none: { title: 'Do Nothing', description: 'Please do not send me any notifications via email' },
  ondemand: { title: 'On Demand', description: 'Send me an email whenever I miss a notification' },
  digest: { title: 'Daily Digest', description: 'Send me a daily email with all of my missed notifcations from the previous day' }
}

const NotificationMethodToken = ({ value }) => (
  <div className="token">
    <strong>{ options[value].title }<br /></strong>
    { options[value].description }
  </div>
)

NotificationMethodToken.propTypes = {
  value: PropTypes.string
}

export default NotificationMethodToken
