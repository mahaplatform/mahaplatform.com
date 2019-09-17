import { Logo } from 'maha-admin'
import React from 'react'

const TeamToken = (team) => (
  <div className="team-token">
    <div className="team-token-logo">
      <Logo team={ team } />
    </div>
    <div className="team-token-label">
      { team.title }
    </div>
  </div>
)

export default TeamToken
