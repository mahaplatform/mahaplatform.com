import PropTypes from 'prop-types'
import React from 'react'

const VendorToken = ({ name, address, integration }) => (
  <div className="token vendor-token">
    <strong>{ name }</strong>
    { address &&
      <span><br />{ address.description }</span>
    }
  </div>
)

VendorToken.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  integration: PropTypes.string
}

export default VendorToken
