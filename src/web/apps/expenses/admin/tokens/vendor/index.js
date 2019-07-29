import PropTypes from 'prop-types'
import React from 'react'

const VendorToken = ({ name, full_address, integration }) => (
  <div className="token vendor-token">
    <strong>{ name }</strong>
    { full_address &&
      <span><br />{ full_address}</span>
    }
  </div>
)

VendorToken.propTypes = {
  name: PropTypes.string,
  full_address: PropTypes.string,
  integration: PropTypes.string
}

export default VendorToken
