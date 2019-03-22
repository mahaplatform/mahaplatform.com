import PropTypes from 'prop-types'
import React from 'react'

const NotificationMethodToken = ({ title, text }) => (
  <div className="token">
    <strong>{ title }<br /></strong>
    { text }
  </div>
)

NotificationMethodToken.propTypes = {
  text: PropTypes.text,
  title: PropTypes.title
}

export default NotificationMethodToken
