import PropTypes from 'prop-types'
import React from 'react'

const RoleToken = ({ title, description }) => (
  <div className="token role-token">
    <strong>{title }</strong><br />
    { description }
  </div>
)

RoleToken.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string
}

export default RoleToken
