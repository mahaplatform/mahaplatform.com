import { Logo } from '@admin'
import React from 'react'

const TeamToken = (team) => (
  <div className="team-token">
    <div className="team-token-logo">
      <Logo team={ team } />
    </div>
    <div className="team-token-label">
      { team.title }
      { team.is_active === false && <span className="team-token-activity">
        INACTIVE
      </span> }
    </div>
  </div>
)

export default TeamToken
