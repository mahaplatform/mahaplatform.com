import WorkflowDesigner from '../workflow_designer'
import SendEmail from './send_email'
import PropTypes from 'prop-types'
import Question from './question'
import SendSMS from './send_sms'
import Record from './record'
import IfElse from './ifelse'
import React from 'react'
import Play from './play'
import Say from './say'

class VoiceDesigner extends React.PureComponent {

  static propTypes = {
    campaign: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <WorkflowDesigner { ...this._getWorkflowDesigner() } />
  }

  _getTrigger() {
    const { campaign } = this.props
    if(campaign.direction === 'inbound') {
      return {
        icon: 'phone',
        label: 'Incoming Call',
        type: 'trigger',
        details: () => campaign.phone_number.formatted
      }
    } else {
      return {
        icon: 'phone',
        label: 'Outgoing Call',
        type: 'trigger'
      }
    }
  }

  _getWorkflowDesigner() {
    const { campaign, onSave } = this.props
    return {
      blocks: [
        this._getTrigger(),
        {
          icon: 'play',
          label: 'Play Recording',
          type: 'verb',
          action: 'play',
          component: Play,
          config: {
            loop: 1
          }
        }, {
          icon: 'volume-control-phone',
          label: 'Speak Text',
          type: 'verb',
          action: 'say',
          component: Say,
          config: {
            voice: 'woman',
            message: 'Hello! How are you?'
          },
          details: ({ message }) => message
        }, {
          icon: 'microphone',
          label: 'Record',
          type: 'verb',
          action: 'record',
          component: Record
        }, {
          icon: 'question',
          label: 'Question',
          type: 'conditional',
          action: 'question',
          component: Question,
          config: {
            options: [{ value: '1', text: '1' }, { value: '2', text: '2' }]
          }
        }, {
          icon: 'random',
          label: 'If / Else',
          type: 'conditional',
          action: 'ifelse',
          component: IfElse,
          config: {
            options: [{ value: '1', text: '1' }, { value: '2', text: '2' }]
          }
        }, {
          icon: 'users',
          label: 'Add to List',
          type: 'action',
          action: 'add_to_list'
        }, {
          icon: 'users',
          label: 'Remove from List',
          type: 'action',
          action: 'remove_from_list'
        }, {
          icon: 'gears',
          label: 'Enroll in Workflow',
          type: 'action',
          action: 'enroll_in_workflow'
        }, {
          icon: 'user',
          label: 'Update Property',
          type: 'action',
          action: 'update_property'
        }, {
          icon: 'book',
          label: 'Update Interest',
          type: 'action',
          action: 'update_interest'
        }, {
          icon: 'envelope',
          label: 'Send Email',
          type: 'action',
          action: 'send_email',
          component: SendEmail
        }, {
          icon: 'comment',
          label: 'Send SMS',
          type: 'action',
          action: 'send_sms',
          component: SendSMS
        }, {
          icon: 'flag',
          label: 'Goal',
          type: 'goal'
        }, {
          icon: 'phone',
          label: 'Hangup',
          type: 'ending'
        }
      ],
      defaultValue: campaign.steps,
      status: campaign.status,
      onSave
    }
  }

}

export default VoiceDesigner
