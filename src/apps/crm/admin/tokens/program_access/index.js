import AccessTypeToken from '../access_type'
import { AssigneeToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const ProgramAccessToken = ({ access }) => (
  <div className="program-access-token">
    <div className="program-access-token-details">
      <AssigneeToken { ...access } />
    </div>
    <div className="program-access-token-type">
      <AccessTypeToken type={ access.type } />
    </div>
  </div>
)

ProgramAccessToken.propTypes = {
  access: PropTypes.object,
  type: PropTypes.string
}

export default ProgramAccessToken
