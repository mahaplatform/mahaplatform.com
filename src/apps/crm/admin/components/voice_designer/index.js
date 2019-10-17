import WorkflowDesigner from '../workflow_designer'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
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
          action: 'play',
          component: Edit
        }, {
          icon: 'volume-control-phone',
          label: 'Speak Text',
          type: 'verb',
          action: 'say',
          component: Say
        }, {
          icon: 'microphone',
          label: 'Record',
          type: 'verb',
          action: 'record',
          component: Edit
        }, {
          icon: 'question',
          label: 'Question',
          type: 'conditional',
          action: 'question',
          default: {
            options: [{ value: '1', text: '1' }, { value: '2', text: '2' }, { value: '3', text: '3' }]
          },
          component: Edit
        }, {
          icon: 'random',
          label: 'If / Else',
          type: 'conditional',
          action: 'ifelse',
          component: Edit
        }, {
          icon: 'users',
          label: 'Add to List',
          type: 'action',
          action: 'add_to_list',
          component: Edit
        }, {
          icon: 'users',
          label: 'Remove from List',
          type: 'action',
          action: 'remove_from_list',
          component: Edit
        }, {
          icon: 'gears',
          label: 'Enroll in Workflow',
          type: 'action',
          action: 'enroll_in_workflow',
          component: Edit
        }, {
          icon: 'user',
          label: 'Update Property',
          type: 'action',
          action: 'update_property',
          component: Edit
        }, {
          icon: 'book',
          label: 'Update Interest',
          type: 'action',
          action: 'update_interest',
          component: Edit
        }, {
          icon: 'envelope',
          label: 'Send Email',
          type: 'action',
          action: 'send_email',
          component: Edit
        }, {
          icon: 'comment',
          label: 'Send SMS',
          type: 'action',
          action: 'send_sms',
          component: Edit
        }, {
          icon: 'flag',
          label: 'Goal',
          type: 'goal',
          action: 'goal',
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
