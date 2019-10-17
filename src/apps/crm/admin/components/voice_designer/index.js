import WorkflowDesigner from '../workflow_designer'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
import Play from './play'
import Say from './say'

class VoiceDesigner extends React.PureComponent {

  static propTypes = {
    config: PropTypes.array
  }

  render() {
    return <WorkflowDesigner { ...this._getWorkflowDesigner() } />
  }

  _getWorkflowDesigner() {
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
          subtype: 'play',
          component: Play,
          config: {
            loop: 1
          }
        }, {
          icon: 'volume-control-phone',
          label: 'Speak Text',
          type: 'verb',
          subtype: 'say',
          component: Say,
          config: {
            voice: 'woman',
            message: 'Hello! How are you?'
          }
        }, {
          icon: 'microphone',
          label: 'Record',
          type: 'verb',
          subtype: 'record',
          component: Edit
        }, {
          icon: 'question',
          label: 'Question',
          type: 'conditional',
          subtype: 'question',
          config: {
            options: [{ value: '1', text: '1' }, { value: '2', text: '2' }]
          },
          component: Edit
        }, {
          icon: 'random',
          label: 'If / Else',
          type: 'conditional',
          subtype: 'ifelse',
          component: Edit
        }, {
          icon: 'users',
          label: 'Add to List',
          type: 'action',
          subtype: 'add_to_list',
          component: Edit
        }, {
          icon: 'users',
          label: 'Remove from List',
          type: 'action',
          subtype: 'remove_from_list',
          component: Edit
        }, {
          icon: 'gears',
          label: 'Enroll in Workflow',
          type: 'action',
          subtype: 'enroll_in_workflow',
          component: Edit
        }, {
          icon: 'user',
          label: 'Update Property',
          type: 'action',
          subtype: 'update_property',
          component: Edit
        }, {
          icon: 'book',
          label: 'Update Interest',
          type: 'action',
          subtype: 'update_interest',
          component: Edit
        }, {
          icon: 'envelope',
          label: 'Send Email',
          type: 'action',
          subtype: 'send_email',
          component: Edit
        }, {
          icon: 'comment',
          label: 'Send SMS',
          type: 'action',
          subtype: 'send_sms',
          component: Edit
        }, {
          icon: 'flag',
          label: 'Goal',
          type: 'goal',
          component: Edit
        }, {
          icon: 'phone',
          label: 'Hangup',
          type: 'ending',
          component: Edit
        }
      ],
      defaultValue: []
    }
  }

}

export default VoiceDesigner
