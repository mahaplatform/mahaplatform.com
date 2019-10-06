import PropTypes from 'prop-types'
import React from 'react'

const services = {
  googlecontacts: 'Google Conatcts',
  googledrive: 'Google Drive',
  googlephotos: 'Google Photos',
  facebook: 'Facebook',
  outlook: 'Outlook 365',
  onedrive: 'Microsoft OneDrive',
  dropbox: 'Dropbox',
  instagram: 'Instagram',
  mailchimp: 'Mail Chimp',
  constantcontact: 'Constant Contact',
  box: 'Box'
}

const ProfileToken = ({ profile }) => {
  const service = services[profile.service]
  return (
    <div className="profile-token">
      <div className="profile-token-icon">
        <img src={`/images/services/${profile.service}.png`} />
      </div>
      <div className="profile-token-label">
        <strong>{ service }</strong><br />
        { profile.username }
      </div>
    </div>
  )
}

ProfileToken.propTypes = {
  profile: PropTypes.object
}

export default ProfileToken
