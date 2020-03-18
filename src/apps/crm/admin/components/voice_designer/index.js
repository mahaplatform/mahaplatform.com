import FlowchartDesigner from '../flowchart_designer'
import PropTypes from 'prop-types'
import question from './question'
import record from './record'
import React from 'react'
import play from './play'
import say from './say'
import _ from 'lodash'

class VoiceDesigner extends React.PureComponent {

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
      editable: _.includes(['active','draft','inactive'], campaign.status),
      endpoint,
      fields,
      program: campaign.program,
      properties,
      tokens,
      blocks: [
        this._getTrigger(),
        play,
        question,
        say,
        record,
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
          label: 'Hangup',
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
        icon: 'phone',
        label: 'Incoming Call',
        type: 'trigger',
        token: () => campaign.phone_number.formatted
      }
    } else {
      return {
        icon: 'phone',
        label: 'Outgoing Call',
        type: 'trigger',
        token: () => campaign.phone_number.formatted
      }
    }
  }

}

export default VoiceDesigner
