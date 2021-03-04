import PropTypes from 'prop-types'
import React from 'react'

const AccessTypeToken = ({ type }) => (
  <div className={`program-access-type-token ${type}`}>
    { type }
  </div>
)

AccessTypeToken.propTypes = {
  type: PropTypes.string
}

export default AccessTypeToken
