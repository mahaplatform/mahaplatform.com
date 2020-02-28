import FlowchartDesigner from '../flowchart_designer'
import PropTypes from 'prop-types'
import React from 'react'

class WorkflowDesigner extends React.PureComponent {

  static propTypes = {
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    tokens: PropTypes.object,
    trigger: PropTypes.object,
    workflow: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
  }

  _getFlowchartDesigner() {
    const { endpoint, fields, workflow, tokens, trigger, onSave } = this.props
    const { config, status } = workflow
    return {
      endpoint,
      fields,
      workflow,
      tokens,
      blocks: [
        {
          icon: trigger.icon,
          label: 'Trigger',
          type: 'trigger',
          action: 'trigger',
          token: () => trigger.text
        },
        { action: 'conditional' },
        { action: 'wait' },
        { action: 'send_email' },
        { action: 'lists' },
        { action: 'interests' },
        { action: 'consent' },
        { action: 'enroll_in_workflow' },
        { action: 'property' },
        { action: 'send_internal_email' },
        { action: 'send_internal_sms' },
        { action: 'goal' },
        {
          icon: 'check',
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
