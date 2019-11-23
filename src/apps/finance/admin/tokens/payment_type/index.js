import React from 'react'

const _getImage = (method, card_type) => {
  if(method === 'paypal') return 'paypal'
  return `${method}-${card_type}`
}

const PaymentTypeToken = ({ method, card_type }) => (
  <div className="finance-payment-type-token">
    <img src={`/admin/images/payments/${_getImage(method, card_type)}.png`} />
  </div>
)

export default PaymentTypeToken
