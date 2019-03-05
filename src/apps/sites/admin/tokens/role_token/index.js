import PropTypes from 'prop-types'
import React from 'react'

const RoleToken = ({ role }) => (
  <div className={`site-role-token ${role.toLowerCase()}`}>
    { role.toUpperCase() }
  </div>
)

RoleToken.propTypes = {
  role: PropTypes.string
}

export default RoleToken
