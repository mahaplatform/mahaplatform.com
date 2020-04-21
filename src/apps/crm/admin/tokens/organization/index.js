import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import React from 'react'

const colors = ['red','orange','green','teal','blue','purple','violet','pink','brown']

const OrganizationToken = (organization) => (
  <div className={`crm-organization-token ${ colors[organization.id % 9] }`}>
    <div className="crm-organization-token-logo">
      <Logo team={{ title: organization.name, logo: organization.logo }} />
    </div>
    <div className="crm-organization-token-label">
      { organization.name }
    </div>
  </div>
)

OrganizationToken.propTypes = {
  organization: PropTypes.object
}

export default OrganizationToken
