import PropTypes from 'prop-types'
import React from 'react'

const _getImage = (method, card) => {
  if(!card) return method
  return `${method}-${card.type}`
}

const PaymentTypeToken = ({ method, card }) => (
  <div className="finance-payment-type-token">
    <img src={`/admin/images/payments/${_getImage(method, card)}.png`} />
  </div>
)

PaymentTypeToken.propTypes = {
  method: PropTypes.string,
  card: PropTypes.object
}

export default PaymentTypeToken
