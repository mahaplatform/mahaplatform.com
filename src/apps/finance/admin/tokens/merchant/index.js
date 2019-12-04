import PropTypes from 'prop-types'
import React from 'react'

const MerchantToken = (merchant) => (
  <div className="token">
    <strong>{ merchant.title }</strong><br />
    { merchant.bank_name } - { merchant.account_number }
  </div>
)

MerchantToken.propTypes = {
  merchant: PropTypes.object
}

export default MerchantToken
