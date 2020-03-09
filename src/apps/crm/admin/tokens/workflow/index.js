import TriggerTypeToken from '../trigger_type'
import React from 'react'
import _ from 'lodash'

const triggers = [
  { trigger_type: 'response', action: null, description: 'Triggered when a contact submits a reponse' },
  { trigger_type: 'open', action: null, description: 'Triggered when a contact opens the email' },
  { trigger_type: 'click', action: null, description: 'Triggered when a contact clicks a link in the email' },
  { trigger_type: 'list', action: 'add', description: 'Triggered when a contact is added to list' },
  { trigger_type: 'list', action: 'remove', description: 'Triggered when a contact is removed from list' },
  { trigger_type: 'topic', action: 'add', description: 'Triggered when a contact is added to topic' },
  { trigger_type: 'topic', action: 'remove', description: 'Triggered when a contact is removed from topic' },
  { trigger_type: 'property', action: null, description: 'Triggered when a contact changes the property' }
]

const WorkflowToken = (workflow) => {
  const { trigger_type, action } = workflow
  const trigger = _.find(triggers, { trigger_type, action })
  return (
    <div className="workflow-token">
      <div className="workflow-token-icon">
        <TriggerTypeToken value={ workflow.trigger_type } />
      </div>
      <div className="workflow-token-label">
        { workflow.trigger_type === 'response' &&
          <strong>Form: { workflow.form.title }</strong>
        }
        { _.includes(['open','click'], workflow.trigger_type) &&
          <strong>Email: { workflow.email.title }</strong>
        }
        { workflow.trigger_type === 'list' &&
          <strong>List: { workflow.list.title }</strong>
        }
        { workflow.trigger_type === 'topic' &&
          <strong>List: { workflow.topic.title }</strong>
        }
        { workflow.trigger_type === 'manual' &&
          <strong>{ workflow.title }</strong>
        }
        <br />
        { workflow.trigger_type === 'manual' ? workflow.title : trigger.description }
      </div>
    </div>
  )
}

export default WorkflowToken
