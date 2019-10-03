import React from 'react'

const strategies = {
  nothing: {
    title: 'Do Nothing',
    description: 'Leave all files and folders as they are'
  },
  transfer: {
    title: 'Transfer Items',
    description: 'Reassign all files and folders to another user'
  },
  delete: {
    title: 'Delete Items',
    description: 'Delete all files and folders'
  }
}

const DriveStrategyToken = ({ value }) => {
  const strategy = strategies[value]
  return (
    <div className="type-token">
      <strong>{ strategy.title }</strong><br />
      { strategy.description }
    </div>
  )
}

export default DriveStrategyToken
