import { Avatar } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const colors = ['red','orange','green','teal','blue','purple','violet','pink','brown']

const ContactAvatarToken = (contact) => (
  <div className={`contact-avatar-token ${ colors[contact.id % 9] }`}>
    <Avatar user={ contact } presence={ false } />
  </div>
)

ContactAvatarToken.propTypes = {
  value: PropTypes.string
}

export default ContactAvatarToken
