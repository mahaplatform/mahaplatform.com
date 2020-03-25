import PropTypes from 'prop-types'
import React from 'react'

const CompactVendorToken = ({ vendor }) => {

  if(!vendor) return null

  return (
    <div className="compact-vendor-token">
      { vendor.integration && vendor.integration.vendor_id && `${ vendor.integration.vendor_id } - ` }
      { vendor.name }
      { vendor.address &&
        <span><br />{ vendor.address.description }</span>
      }
    </div>
  )

}

CompactVendorToken.propTypes = {
  vendor: PropTypes.object
}

export default CompactVendorToken
