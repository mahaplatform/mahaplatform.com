import PropTypes from 'prop-types'
import React from 'react'

const BankToken = ({ bank }) => (
  <div className="token">
    <strong>{ bank.title }</strong><br />
    { bank.bank_name }<br />
    Routing #{ bank.routing_number }<br />
    Account #{ bank.account_number }<br />
    { bank.braintree_id ?
      <span>Braintree { bank.braintree_id }</span> :
      <span>Not yet connected</span>
    }
  </div>
)

BankToken.propTypes = {
  bank: PropTypes.object
}

export default BankToken
