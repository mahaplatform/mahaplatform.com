import TriggerTypeToken from '../trigger_type'
import React from 'react'

const WorkflowToken = (workflow) => (
  <div className="workflow-token">
    <div className="workflow-token-icon">
      <TriggerTypeToken value={ workflow.trigger_type } />
    </div>
    <div className="workflow-token-label">
      { workflow.display_name }
    </div>
  </div>
)

export default WorkflowToken
