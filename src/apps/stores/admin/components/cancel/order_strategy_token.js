import React from 'react'

const strategies = {
  cancel: {
    title: 'Cancel this Order',
    description: 'Delete order from history'
  },
  refund: {
    title: 'Refund this Order',
    description: 'Refund one or more items from this order'
  }
}

const OrderStrategyToken = ({ value }) => {
  const strategy = strategies[value]
  return (
    <div className="type-token">
      <strong>{ strategy.title }</strong><br />
      { strategy.description }
    </div>
  )
}

export default OrderStrategyToken
