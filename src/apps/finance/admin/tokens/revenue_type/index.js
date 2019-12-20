import PropTypes from 'prop-types'
import React from 'react'

const RevenueTypeToken = ({ description, integration, title }) => (
  <div className="token revenue-type-token">
    { integration && integration.revenue_code && <strong>{ integration.revenue_code  } - </strong> }
    { title }<br />
    <div className="revenue-type-token-description">
      { description }
    </div>
  </div>
)

RevenueTypeToken.propTypes = {
  description: PropTypes.string,
  integration: PropTypes.string,
  title: PropTypes.string
}

export default RevenueTypeToken
