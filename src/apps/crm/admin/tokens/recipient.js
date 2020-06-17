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
  const getRecipientChannel = (recipient) => {
    if(recipient.email_address) return <span>&lt;{ recipient.email_address.address }&gt;</span>
    if(recipient.phone_number ) return <Format format="phone" value={ recipient.phone_number.number } />
    return null
  }
  return (
    <div className="contact-token">
      <div className="contact-token-avatar">
        <ContactAvatar { ...contact } />
      </div>
      <div className="contact-token-label">
        { recipient.contact.full_name } { getRecipientChannel(recipient) }
      </div>
    </div>
  )
}

RecipientToken.propTypes = {
  recipient: PropTypes.object
}

export default RecipientToken
