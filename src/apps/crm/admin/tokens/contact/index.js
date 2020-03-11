import ContactAvatar from '../contact_avatar'
import PropTypes from 'prop-types'
import React from 'react'

const ContactToken = (contact) => (
  <div className="contact-token">
    <div className="contact-token-avatar">
      <ContactAvatar { ...contact } />
    </div>
    <div className="contact-token-label">
      { contact[contact.value || 'display_name'] }
    </div>
  </div>
)

ContactToken.propTypes = {
  contact: PropTypes.object
}

export default ContactToken
