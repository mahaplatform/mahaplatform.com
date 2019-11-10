import React from 'react'

const visbilities = {
  public: {
    title: 'Public',
    description: 'Assign view privileges to everyone'
  },
  private: {
    title: 'Private',
    description: 'Do not assign view privileges to everyone'
  }
}

const VisibilityToken = ({ value }) => {
  const visbility = visbilities[value]
  return (
    <div className="type-token">
      <strong>{ visbility.title }</strong><br />
      { visbility.description }
    </div>
  )
}

export default VisibilityToken
