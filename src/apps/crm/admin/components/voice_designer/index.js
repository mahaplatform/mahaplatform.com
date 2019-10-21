import WorkflowDesigner from '../workflow_designer'
import EnrollInWorkflow from './enroll_in_workflow'
import RemoveFromList from './remove_from_list'
import UpdateProperty from './update_property'
import UpdateInterest from './update_interest'
import AddToList from './add_to_list'
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
    defaultValue: PropTypes.array,
    onSave: PropTypes.func
  }

  render() {
    return <WorkflowDesigner { ...this._getWorkflowDesigner() } />
  }

  _getWorkflowDesigner() {
    const { defaultValue, onSave } = this.props
    return {
      blocks: [
        {
          icon: 'phone',
          label: 'Incoming Call',
          type: 'trigger'
        }, {
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
          }
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
          action: 'add_to_list',
          component: AddToList
        }, {
          icon: 'users',
          label: 'Remove from List',
          type: 'action',
          action: 'remove_from_list',
          component: RemoveFromList
        }, {
          icon: 'gears',
          label: 'Enroll in Workflow',
          type: 'action',
          action: 'enroll_in_workflow',
          component: EnrollInWorkflow
        }, {
          icon: 'user',
          label: 'Update Property',
          type: 'action',
          action: 'update_property',
          component: UpdateProperty
        }, {
          icon: 'book',
          label: 'Update Interest',
          type: 'action',
          action: 'update_interest',
          component: UpdateInterest
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
      defaultValue,
      onSave
    }
  }

}

export default VoiceDesigner
