import { Avatar } from 'maha-admin'
import React from 'react'

const ContactToken = (contact) => (
  <div className="contact-token">
    <div className="contact-token-avatar">
      <Avatar user={ contact } />
    </div>
    <div className="contact-token-label">
      { contact.full_name &&
        <span>{ contact.full_name }, </span>
      }
      { contact.email }
    </div>
  </div>
)

export default ContactToken
