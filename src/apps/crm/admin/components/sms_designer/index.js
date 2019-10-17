import WorkflowDesigner from '../workflow_designer'
import PropTypes from 'prop-types'
import React from 'react'

class SMSDesigner extends React.PureComponent {

  static propTypes = {
    config: PropTypes.array
  }

  render() {
    return <WorkflowDesigner { ...this._getWorkflowDesigner() } />
  }

  _getWorkflowDesigner() {
    return {
      blocks: [
        { icon: 'comment', label: 'Incoming SMS', type: 'trigger' },
        { icon: 'comment', label: 'Respond', type: 'verb', action: 'message' },
        { icon: 'question', label: 'Question', type: 'conditional', action: 'question' },
        { icon: 'random', label: 'If / Else', type: 'conditional', action: 'ifelse' },
        { icon: 'users', label: 'Add to List', type: 'action', action: 'add_to_list' },
        { icon: 'users', label: 'Remove from List', type: 'action', action: 'remove_from_list' },
        { icon: 'gears', label: 'Enroll in Workflow', type: 'action', action: 'enroll_in_workflow' },
        { icon: 'user', label: 'Update Property', type: 'action', action: 'update_property' },
        { icon: 'book', label: 'Update Interest', type: 'action', action: 'update_interest' },
        { icon: 'envelope', label: 'Send Email', type: 'action', action: 'send_email' },
        { icon: 'comment', label: 'Send SMS', type: 'action', action: 'send_sms' },
        { icon: 'flag', label: 'Goal', type: 'goal', action: 'goal' },
        { icon: 'stop', label: 'End', type: 'ending' }
      ],
      defaultValue: []
    }
  }

}

export default SMSDesigner
