import PropTypes from 'prop-types'
import React from 'react'

const CompactRevenueTypeToken = ({ revenue_type }) => {

  if(!revenue_type) return null

  return (
    <div className="compact-revenue-type-token">
      { revenue_type.integration.revenue_code }
      <span> - </span>
      { revenue_type.title }
    </div>
  )


}

CompactRevenueTypeToken.propTypes = {
  revenue_type: PropTypes.object
}

export default CompactRevenueTypeToken
