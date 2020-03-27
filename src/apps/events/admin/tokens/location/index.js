import PropTypes from 'prop-types'
import React from 'react'

const LocationToken = ({ name, address }) => (
  <div className="token">
    <strong>{ name }</strong>
    { address &&
      <span><br />{ address.description }</span>
    }
  </div>
)

LocationToken.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string
}

export default LocationToken
