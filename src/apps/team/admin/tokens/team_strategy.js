import React from 'react'

const strategies = {
  remove: {
    title: 'Remove Associations',
    description: 'Remove this user\'s employee type, roles, groups, and supervisions'
  },
  nothing: {
    title: 'Do Nothing',
    description: 'Leave this user\'s associations intact'
  }
}

const TeamStrategyToken = ({ value }) => {
  const strategy = strategies[value]
  return (
    <div className="type-token">
      <strong>{ strategy.title }</strong><br />
      { strategy.description }
    </div>
  )
}

export default TeamStrategyToken
