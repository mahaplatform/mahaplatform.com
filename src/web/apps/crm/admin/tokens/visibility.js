import React from 'react'

const visbilities = {
  public: {
    title: 'Public',
    description: 'Visible to all users'
  },
  private: {
    title: 'Private',
    description: 'Visible to specific groups or individuals'
  }
}

const VisibilityToken = ({ value }) => {
  const visbility = value ? visbilities.private : visbilities.public
  return (
    <div className="type-token">
      <strong>{ visbility.title }</strong><br />
      { visbility.description }
    </div>
  )
}

export default VisibilityToken
