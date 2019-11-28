import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const ContactToken = (contact) => (
  <div className="contact-token">
    <div className="contact-token-avatar">
      <Avatar user={ contact } />
    </div>
    <div className="contact-token-label">
      { contact.display_name }
    </div>
  </div>
)

ContactToken.propTypes = {
  value: PropTypes.string
}

export default ContactToken
