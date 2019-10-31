import FlowchartDesigner from '../flowchart_designer'
import PropTypes from 'prop-types'
import React from 'react'

class SMSDesigner extends React.PureComponent {

  static propTypes = {
    workflow: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
  }

  _getFlowchartDesigner() {
    const { workflow, onSave } = this.props
    const { steps, status } = workflow
    return {
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
        { action: 'enroll_in_workflow' },
        { action: 'update_property' },
        { action: 'update_interest' },
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
      defaultValue: steps,
      status,
      onSave
    }
  }

}

export default SMSDesigner
