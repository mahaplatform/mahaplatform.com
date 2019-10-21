import WorkflowDesigner from '../workflow_designer'
import PropTypes from 'prop-types'
import Question from './question'
import Message from './message'
import React from 'react'

class SMSDesigner extends React.PureComponent {

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
          icon: 'comment',
          label: 'Incoming SMS',
          type: 'trigger'
        }, {
          icon: 'comment',
          label: 'Message',
          type: 'verb',
          subtype: 'message',
          component: Message,
          config: {},
          details: 'message'
        }, {
          icon: 'question',
          label: 'Question',
          type: 'conditional',
          subtype: 'question',
          component: Question,
          config: {
            question: 'Would you like to buy a vowel?',
            options: [{ value: 'yes', text: 'YES' }, { value: 'no', text: 'NO' }]
          },
          details: 'question'
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

export default SMSDesigner
