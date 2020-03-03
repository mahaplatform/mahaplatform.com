import TriggerTypeToken from '../trigger_type'
import React from 'react'

const triggers = {
  form_submission: 'Triggered when a contact submits a form reponse',
  email_open: 'Triggered when a contact opens en email',
  email_click: 'Triggered when a contact clicks a link in an email',
  manual_enrollment: 'Triggered when a contact is manually enrolled'
}

const WorkflowToken = (workflow) => (
  <div className="workflow-token">
    <div className="workflow-token-icon">
      <TriggerTypeToken value={ workflow.trigger_type } />
    </div>
    <div className="workflow-token-label">
      <strong>{ workflow.title }</strong><br />
      { triggers[workflow.trigger_type] }
    </div>
  </div>
)

export default WorkflowToken
