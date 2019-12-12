import PropTypes from 'prop-types'
import React from 'react'

const _getImage = (method, payment_method) => {
  if(!payment_method) return method
  return `${method}-${payment_method.card_type}`
}

const PaymentTypeToken = ({ method, payment_method }) => (
  <div className="finance-payment-type-token">
    <img src={`/admin/images/payments/${_getImage(method, payment_method)}.png`} />
  </div>
)

PaymentTypeToken.propTypes = {
  method: PropTypes.string,
  payment_method: PropTypes.object
}

export default PaymentTypeToken
