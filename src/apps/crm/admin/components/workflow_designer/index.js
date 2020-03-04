import FlowchartDesigner from '../flowchart_designer'
import PropTypes from 'prop-types'
import React from 'react'

class WorkflowDesigner extends React.PureComponent {

  static propTypes = {
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    tokens: PropTypes.array,
    trigger: PropTypes.object,
    workflow: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
  }

  _getFlowchartDesigner() {
    const { endpoint, fields, workflow, tokens, trigger, onSave } = this.props
    const { steps, status } = workflow
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
        { action: 'ifthen' },
        { action: 'wait' },
        { action: 'email' },
        { action: 'sms' },
        { action: 'list' },
        { action: 'topic' },
        { action: 'consent' },
        { action: 'workflow' },
        { action: 'property' },
        { action: 'internal_email' },
        { action: 'internal_sms' },
        { action: 'goal' },
        {
          icon: 'check',
          label: 'Complete',
          type: 'ending',
          action: 'ending',
          token: () => 'Workflow is complete'
        }
      ],
      defaultValue:steps,
      status,
      onSave
    }
  }

}

export default WorkflowDesigner
