import WorkflowDesigner from '../workflow_designer'
import PropTypes from 'prop-types'
import React from 'react'

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
        { icon: 'phone', label: 'Incoming Call', type: 'trigger' },
        { icon: 'play', label: 'Play Recording', type: 'verb', action: 'play' },
        { icon: 'volume-control-phone', label: 'Speak Text', type: 'verb', action: 'say' },
        { icon: 'microphone', label: 'Record', type: 'verb', action: 'record' },
        { icon: 'question', label: 'Question', type: 'conditional', action: 'question' },
        { icon: 'random', label: 'If / Else', type: 'conditional', action: 'ifelse' },
        { icon: 'users', label: 'Add to List', type: 'action', action: 'add_to_list' },
        { icon: 'users', label: 'Remove from List', type: 'action', action: 'remove_from_list' },
        { icon: 'gears', label: 'Enroll in Workflow', type: 'action', action: 'enroll_in_workflow' },
        { icon: 'user', label: 'Update Property', type: 'action', action: 'update_property' },
        { icon: 'book', label: 'Update Interest', type: 'action', action: 'update_interest' },
        { icon: 'envelope', label: 'Send Email', type: 'action', action: 'send_email' },
        { icon: 'comment', label: 'Send SMS', type: 'action', action: 'send_sms' },
        { icon: 'flag', label: 'Goal', type: 'goal', action: 'goal' },
        { icon: 'phone', label: 'Hangup', type: 'ending' }
      ],
      defaultValue: [
        { id: 1, code: 'abc123', type: 'verb', delta: 0, parent_id: null, answer_value: null, config: { action: 'play' } },
        { id: 2, code: 'bcd123', type: 'conditional', delta: 1, parent_id: null, answer_value: null, config: { action: 'question', options: [{ value: 1, text: 1 }, { value: 2, text: 2 }] } },
        { id: 3, code: 'cde123', type: 'verb', delta: 0, parent_id: 2, answer_value: 1, config: { action: 'say' } },
        { id: 4, code: 'def123', type: 'action', delta: 1, parent_id: 2, answer_value: 1, config: { action: 'update_property' } },
        { id: 6, code: 'bcd123', type: 'conditional', delta: 2, parent_id: 2, answer_value: 1, config: { action: 'question', options: [{ value: 1, text: 1 }, { value: 2, text: 2 }] } },
        { id: 5, code: 'fgh123', type: 'verb', delta: 0, parent_id: 2, answer_value: 2, config: { action: 'say' } },
        { id: 7, code: 'ghi123', type: 'action', delta: 1, parent_id: 2, answer_value: 2, config: { action: 'add_to_list' } },
        { id: 8, code: 'ghi123', type: 'action', delta: 2, parent_id: 2, answer_value: 2, config: { action: 'send_email' } },
        { id: 9, code: 'hij123', type: 'goal', delta: 3, parent_id: 2, answer_value: 2, config: {} }
      ]
    }
  }

}

export default VoiceDesigner
