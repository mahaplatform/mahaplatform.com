import { Logo } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const OrganizationToken = (organization) => (
  <div className="team-token">
    <div className="team-token-logo">
      <Logo team={{ title: organization.name, logo: organization.logo }} />
    </div>
    <div className="team-token-label">
      { organization.name }
    </div>
  </div>
)

OrganizationToken.propTypes = {
  organization: PropTypes.object
}

export default OrganizationToken
