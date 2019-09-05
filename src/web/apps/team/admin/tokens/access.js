import React from 'react'

const accesses = {
  public: {
    title: 'Public',
    description: 'Contact activities are visible to all users'
  },
  private: {
    title: 'Private',
    description: 'Contact activities are only visible to specific groups or individuals'
  }
}

const AccessToken = ({ value }) => {
  const access = value ? accesses.private : accesses.public
  return (
    <div className="type-token">
      <strong>{ access.title }</strong><br />
      { access.description }
    </div>
  )
}

export default AccessToken
