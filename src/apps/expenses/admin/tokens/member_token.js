import { CompactUserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const MemberToken = ({ member }) => (
  <div className="member-token">
    <div className="member-token-user">
      <CompactUserToken { ...member.user } />
    </div>
    <div className="member-token-type">
      <div className={`member-type-token ${member.member_type.name.toLowerCase()}`}>
        { member.member_type.name.toUpperCase() }
      </div>
    </div>
  </div>
)

MemberToken.propTypes = {
  member: PropTypes.object
}

export default MemberToken
