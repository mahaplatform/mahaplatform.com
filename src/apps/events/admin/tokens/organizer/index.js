import OrganizerAvatar from '../organizer_avatar'
import PropTypes from 'prop-types'
import React from 'react'

const OrganizerToken = (organizer) => (
  <div className="organizer-token">
    <div className="organizer-token-avatar">
      <OrganizerAvatar { ...organizer } />
    </div>
    <div className="organizer-token-label">
      { organizer.name }
    </div>
  </div>
)

OrganizerToken.propTypes = {
  organizer: PropTypes.object
}

export default OrganizerToken
