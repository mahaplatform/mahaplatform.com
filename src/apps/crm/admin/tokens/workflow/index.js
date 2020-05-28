import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import React from 'react'

const WorkflowToken = ({ display_name, program }) => (
  <div className="workflow-token">
    <div className="workflow-token-icon">
      <Logo team={ program } width="24" />
    </div>
    <div className="workflow-token-label">
      { display_name }
    </div>
  </div>
)

WorkflowToken.propTypes = {
  display_name: PropTypes.string,
  program: PropTypes.object
}

export default WorkflowToken
