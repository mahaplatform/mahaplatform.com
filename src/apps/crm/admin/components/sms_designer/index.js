import FlowchartDesigner from '../flowchart_designer'
import PropTypes from 'prop-types'
import question from './question'
import message from './message'
import listen from './listen'
import ending from './ending'
import React from 'react'

class SMSDesigner extends React.PureComponent {

  static propTypes = {
    campaign: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
  }

  _getFlowchartDesigner() {
    const { campaign, onSave } = this.props
    const { steps, status } = campaign
    return {
      blocks: [
        this._getTrigger(),
        message,
        listen,
        { action: 'wait' },
        question,
        { action: 'ifelse' },
        { action: 'add_to_list' },
        { action: 'remove_from_list' },
        { action: 'enroll_in_workflow' },
        { action: 'update_property' },
        { action: 'update_interest' },
        { action: 'send_internal_email' },
        { action: 'send_internal_sms' },
        { action: 'goal' },
        ending
      ],
      defaultValue: steps,
      status,
      onSave
    }
  }

  _getTrigger() {
    const { campaign } = this.props
    return {
      icon: 'comment',
      label: 'Incoming SMS',
      type: 'trigger',
      action: 'trigger',
      token: () => (
        <div>
          <div>{ campaign.phone_number.formatted}</div>
          <div>&quot;{ campaign.term }&quot;</div>
        </div>
      )
    }
  }

}

export default SMSDesigner
