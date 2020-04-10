import PropTypes from 'prop-types'
import React from 'react'

const PaymentToken = ({ value }) => (
  <div className={`payment-token ${ value ? 'paid' : 'unpaid' }`}>
    { value ? 'paid' : 'unpaid' }
  </div>
)

PaymentToken.propTypes = {
  value: PropTypes.bool
}

export default PaymentToken
