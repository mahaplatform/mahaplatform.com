import PropTypes from 'prop-types'
import React from 'react'

const member_types = ['owner','approver','member']

const CompactMemberTypeToken = ({ member_type_id }) => (
  <div className={`membership-type-token ${ member_types[member_type_id - 1].toLowerCase()}` }>
    { member_types[member_type_id - 1].toUpperCase() }
  </div>
)

CompactMemberTypeToken.propTypes = {
  member_type_id: PropTypes.number
}

export default CompactMemberTypeToken
