import TriggerTypeToken from '../trigger_type'
import React from 'react'

const triggers = {
  response: 'Triggered when a contact submits a form reponse',
  open: 'Triggered when a contact opens en email',
  click: 'Triggered when a contact clicks a link in an email',
  list: 'Triggered when a contact is added to a list',
  topic: 'Triggered when a contact is added to a topic',
  property: 'Triggered when a contact clicks a link in an email',
  manual: 'Triggered when a contact is manually enrolled'
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
