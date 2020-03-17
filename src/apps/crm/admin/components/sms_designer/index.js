import FlowchartDesigner from '../flowchart_designer'
import PropTypes from 'prop-types'
import question from './question'
import message from './message'
import React from 'react'
import _ from 'lodash'

class SMSDesigner extends React.PureComponent {

  static propTypes = {
    campaign: PropTypes.object,
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    properties: PropTypes.array,
    tokens: PropTypes.array,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
  }

  _getFlowchartDesigner() {
    const { campaign, endpoint, fields, properties, tokens, onSave } = this.props
    const { steps, status } = campaign
    return {
      editable: _.includes(['draft','inactive'], campaign.status),
      endpoint,
      fields,
      program: campaign.program,
      properties,
      tokens,
      blocks: [
        this._getTrigger(),
        message,
        question,
        { action: 'ifthen' },
        { action: 'wait' },
        { action: 'goal' },
        { action: 'set' },
        { action: 'property' },
        { action: 'consent' },
        { action: 'list' },
        { action: 'topic' },
        { action: 'workflow' },
        { action: 'email' },
        { action: 'sms' },
        { action: 'internal_email' },
        { action: 'internal_sms' },
        {
          icon: 'phone',
          label: 'End Conversation',
          type: 'ending',
          action: 'ending'
        }
      ],
      defaultValue: steps,
      status,
      onSave
    }
  }

  _getTrigger() {
    const { campaign } = this.props
    if(campaign.direction === 'inbound') {
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
    } else {
      return {
        icon: 'comment',
        label: 'Outbound SMS',
        type: 'trigger',
        action: 'trigger',
        token: () => (
          <div>
            <div>{ campaign.phone_number.formatted}</div>
          </div>
        )
      }
    }
  }

}

export default SMSDesigner
