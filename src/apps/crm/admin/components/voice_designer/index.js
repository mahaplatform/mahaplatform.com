import FlowchartDesigner from '../flowchart_designer'
import PropTypes from 'prop-types'
import question from './question'
import Record from './record'
import React from 'react'
import Play from './play'
import Say from './say'

class VoiceDesigner extends React.PureComponent {

  static propTypes = {
    campaign: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <FlowchartDesigner { ...this._getFlowchartDesigner() } />
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
        type: 'trigger'
      }
    }
  }

  _getFlowchartDesigner() {
    const { campaign, onSave } = this.props
    const { steps, status } = campaign
    return {
      blocks: [
        this._getTrigger(),
        {
          icon: 'play',
          label: 'Play Recording',
          type: 'verb',
          action: 'play',
          form: Play,
          config: {
            loop: 1
          }
        }, {
          icon: 'volume-control-phone',
          label: 'Speak Text',
          type: 'verb',
          action: 'say',
          form: Say,
          config: {
            voice: 'woman',
            message: 'Hello! How are you?'
          },
          token: ({ message }) => message
        }, {
          icon: 'microphone',
          label: 'Record',
          type: 'verb',
          action: 'record',
          form: Record
        },
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

}

export default VoiceDesigner
