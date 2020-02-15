import ContactAvatar from './contact_avatar'
import { Format } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const RecipientToken = ({ recipient }) => {
  const contact = {
    id: recipient.contact.id,
    full_name: recipient.contact.full_name,
    initials: recipient.contact.initials
  }
  return (
    <div className="contact-token">
      <div className="contact-token-avatar">
        <ContactAvatar { ...contact } />
      </div>
      { recipient.email_address &&
        <div className="contact-token-label">
          { recipient.contact.full_name } &lt;{ recipient.email_address.address }&gt;
        </div>
      }
      { recipient.phone_number &&
        <div className="contact-token-label">
          { recipient.contact.full_name } <Format format="phone" value={ recipient.phone_number.number } />
        </div>
      }
    </div>
  )
}

RecipientToken.propTypes = {
  recipient: PropTypes.object
}

export default RecipientToken
