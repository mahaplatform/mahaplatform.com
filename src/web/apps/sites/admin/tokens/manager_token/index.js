import { UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const ManagerToken = (manager) => (
  <div className="manager-token">
    <div className="manager-token-item">
      <UserToken { ...manager.user } presence={ false } />
    </div>
    <div className="manager-token-type">
      <div className={`manager-type-token ${manager.role.toLowerCase()}`}>
        { manager.role.toUpperCase() }
      </div>
    </div>
  </div>
)

ManagerToken.propTypes = {
  manager: PropTypes.object
}

export default ManagerToken
