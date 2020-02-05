import FlowchartDesigner from '../flowchart_designer'
import PropTypes from 'prop-types'
import React from 'react'

class WorkflowDesigner extends React.PureComponent {

  static propTypes = {
    fields: PropTypes.array,
    tokens: PropTypes.object,
    workflow: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
  }

  _getFlowchartDesigner() {
    const { fields, workflow, tokens, onSave } = this.props
    const { config, status } = workflow
    return {
      fields,
      workflow,
      tokens,
      blocks: [
        {
          icon: 'comment',
          label: 'Trigger',
          type: 'trigger',
          action: 'trigger',
          token: () => 'Form is completed'
        },
        { action: 'conditional' },
        { action: 'wait' },
        { action: 'send_email' },
        { action: 'subscription' },
        { action: 'interest' },
        { action: 'consent' },
        { action: 'enroll_in_workflow' },
        { action: 'update_property' },
        { action: 'send_internal_email' },
        { action: 'send_internal_sms' },
        { action: 'goal' },
        {
          icon: 'hand-paper-o',
          label: 'Complete',
          type: 'ending',
          action: 'ending',
          token: () => 'Workflow is complete'
        }
      ],
      defaultValue: config.steps,
      status,
      onSave
    }
  }

}

export default WorkflowDesigner
