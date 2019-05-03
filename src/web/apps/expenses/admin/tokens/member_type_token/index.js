import PropTypes from 'prop-types'
import React from 'react'

const MemberTypeToken = ({ name, description }) => (
  <div className="token member-type-token">
    <strong>{ name }</strong><br />
    { description }
  </div>
)

MemberTypeToken.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string
}

export default MemberTypeToken
