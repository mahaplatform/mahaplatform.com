import PropTypes from 'prop-types'
import React from 'react'

const CompactMemberTypeToken = ({ type }) => (
  <div className={`membership-type-token ${ type }`}>
    { type.toUpperCase() }
  </div>
)

CompactMemberTypeToken.propTypes = {
  type: PropTypes.stringh
}

export default CompactMemberTypeToken
