import PropTypes from 'prop-types'
import React from 'react'

const CompactVendorToken = ({ vendor }) => {

  if(!vendor) return null

  return (
    <div className="compact-vendor-token">
      { vendor.integration && vendor.integration.vendor_id && `${ vendor.integration.vendor_id } - ` }
      { vendor.name }
      { vendor.full_address &&
        <span><br />{ vendor.full_address}</span>
      }
    </div>
  )

}

CompactVendorToken.propTypes = {
  vendor: PropTypes.object
}

export default CompactVendorToken
