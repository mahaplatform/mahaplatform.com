import PropTypes from 'prop-types'
import React from 'react'

const strategies = {
  ach: {
    title: 'Bank Refund',
    description: 'Refund money back to bank account'
  },
  card: {
    title: 'Card Refund',
    description: 'Refund money back to credit card'
  },
  paypal: {
    title: 'PayPal Refund',
    description: 'Refund money back to PayPal account'
  },
  credit: {
    title: 'Customer Credit',
    description: 'Refund money to a customer Credit'
  }
}

const RefundStrategyToken = ({ value }) => (
  <div className="type-token">
    <strong>{ strategies[value].title }</strong><br />
    { strategies[value].description }
  </div>
)

RefundStrategyToken.propTypes = {
  value: PropTypes.string
}

export default RefundStrategyToken
