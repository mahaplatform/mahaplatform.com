import PropTypes from 'prop-types'
import React from 'react'

const MerchantToken = ({ merchant }) => (
  <div className="token">
    <strong>{ merchant.title }</strong><br />
    { merchant.braintree_id }
  </div>
)

MerchantToken.propTypes = {
  merchant: PropTypes.object
}

export default MerchantToken
