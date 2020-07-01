import PropTypes from 'prop-types'
import React from 'react'

const BankToken = (bank) => (
  <div className="token">
    <strong>{ bank.title }</strong><br />
    { bank.bank_name } - { bank.account_number }
  </div>
)

BankToken.propTypes = {
  bank: PropTypes.object
}

export default BankToken
