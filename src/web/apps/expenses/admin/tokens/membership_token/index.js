import CompactMemberTypeToken from '../member_type_token/compact'
import CompactProjectToken from '../project_token/compact'
import { CompactUserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const MembershipToken = ({ membership, type }) => (
  <div className="membership-token">
    <div className="membership-token-item">
      { type === 'user' && <CompactUserToken { ...membership.user } /> }
      { type === 'project' && <CompactProjectToken project={ membership.project } /> }
    </div>
    <div className="membership-token-type">
      <CompactMemberTypeToken { ...membership } />
    </div>
  </div>
)

MembershipToken.propTypes = {
  membership: PropTypes.object,
  type: PropTypes.string
}

export default MembershipToken
