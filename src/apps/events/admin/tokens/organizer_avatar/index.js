import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const colors = ['red','orange','green','teal','blue','purple','violet','pink','brown']

const OrganizerAvatarToken = (organizer) => (
  <div className={`organizer-avatar-token ${ colors[organizer.id % 9] }`}>
    <Avatar user={ organizer } />
  </div>
)

OrganizerAvatarToken.propTypes = {
  value: PropTypes.string
}

export default OrganizerAvatarToken
