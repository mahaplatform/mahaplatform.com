import PropTypes from 'prop-types'
import React from 'react'

const MerchantToken = ({ merchant }) => (
  <div className="token">
    <strong>{ merchant.title }</strong><br />
    { merchant.bank_name }<br />
    Routing #{ merchant.routing_number }<br />
    Account #{ merchant.account_number }<br />
    { merchant.braintree_id ?
      <span>Braintree { merchant.braintree_id }</span> :
      <span>Not yet connected</span>
    }
  </div>
)

MerchantToken.propTypes = {
  merchant: PropTypes.object
}

export default MerchantToken
