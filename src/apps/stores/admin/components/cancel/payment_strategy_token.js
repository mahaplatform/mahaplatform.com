import PropTypes from 'prop-types'
import React from 'react'

const strategies = {
  nothing: {
    title: 'Do Nothing',
    description: 'Don\'t do anything'
  },
  ach: {
    title: 'Bank Payment',
    description: 'Payment money back to bank account'
  },
  card: {
    title: 'Card Payment',
    description: 'Payment money back to credit card'
  },
  paypal: {
    title: 'PayPal Payment',
    description: 'Payment money back to PayPal account'
  },
  credit: {
    title: 'Customer Credit',
    description: 'Payment money to a customer Credit'
  }
}

const PaymentStrategyToken = ({ value }) => (
  <div className="type-token">
    <strong>{ strategies[value].title }</strong><br />
    { strategies[value].description }
  </div>
)

PaymentStrategyToken.propTypes = {
  value: PropTypes.string
}

export default PaymentStrategyToken
