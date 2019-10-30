import { Logo } from 'maha-admin'
import React from 'react'

const ProgramToken = (program) => (
  <div className="program-token">
    <div className="program-token-logo">
      <Logo team={ program } width="24" />
    </div>
    <div className="program-token-label">
      { program.title }
    </div>
  </div>
)

export default ProgramToken
