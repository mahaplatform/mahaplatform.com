import FlowchartDesigner from '../flowchart_designer'
import PropTypes from 'prop-types'
import React from 'react'

class WorkflowDesigner extends React.PureComponent {

  static propTypes = {
    tokens: PropTypes.object,
    workflow: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
  }

  _getFlowchartDesigner() {
    const { workflow, tokens, onSave } = this.props
    const { config, status } = workflow
    return {
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
        { action: 'ifelse' },
        { action: 'wait' },
        { action: 'send_email' },
        { action: 'add_to_list' },
        { action: 'remove_from_list' },
        { action: 'add_interest' },
        { action: 'remove_interest' },
        { action: 'enroll_in_workflow' },
        { action: 'update_property' },
        { action: 'send_internal_email' },
        { action: 'send_internal_sms' },
        { action: 'goal' },
        {
          icon: 'phone',
          label: 'Complete Workflow',
          type: 'ending',
          action: 'ending'
        }
      ],
      defaultValue: config.steps,
      status,
      onSave
    }
  }

}

export default WorkflowDesigner
