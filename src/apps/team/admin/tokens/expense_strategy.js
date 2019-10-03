import React from 'react'

const strategies = {
  remove: {
    title: 'Remove Membership',
    description: 'Remove this user from all projects'
  },
  nothing: {
    title: 'Do Nothing',
    description: 'Leave this users memberships intact'
  }
}

const ExpenseStrategyToken = ({ value }) => {
  const strategy = strategies[value]
  return (
    <div className="type-token">
      <strong>{ strategy.title }</strong><br />
      { strategy.description }
    </div>
  )
}

export default ExpenseStrategyToken
