import PropTypes from 'prop-types'
import React from 'react'

const RevenueToken = ({ description, integration, title }) => (
  <div className="token revenue-type-token">
    { integration && integration.revenue_code && <strong>{ integration.revenue_code  } - </strong> }
    { title }<br />
    <div className="revenue-type-token-description">
      { description }
    </div>
  </div>
)

RevenueToken.propTypes = {
  description: PropTypes.string,
  integration: PropTypes.string,
  title: PropTypes.string
}

export default RevenueToken
