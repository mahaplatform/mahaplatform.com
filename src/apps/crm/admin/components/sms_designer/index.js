import WorkflowDesigner from '../workflow_designer'
import { Image } from 'maha-admin'
import PropTypes from 'prop-types'
import Question from './question'
import Message from './message'
import Listen from './listen'
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
          type: 'trigger',
          action: 'trigger'
        }, {
          icon: 'comment',
          label: 'Send Message',
          type: 'verb',
          action: 'message',
          component: Message,
          config: {},
          details: ({ asset_ids, message }) => (
            <div>
              { asset_ids &&
                <div>
                  <img src="/imagecache/fit=cover&w=100&h=100/assets/8121/hardcider.jpeg" />
                </div>
              }
              { message }
            </div>
          )
        }, {
          icon: 'volume-up',
          label: 'Listen',
          type: 'verb',
          action: 'listen',
          component: Listen,
          config: {},
          details: ({ message }) => message
        }, {
          icon: 'question',
          label: 'Question',
          type: 'conditional',
          action: 'question',
          component: Question,
          config: {
            question: 'Would you like to buy a vowel?',
            options: [{ value: 'yes', text: 'YES' }, { value: 'no', text: 'NO' }]
          },
          details: ({ question }) => question
        }, {
          icon: 'flag',
          label: 'Goal',
          type: 'goal',
          action: 'ending'
        }, {
          icon: 'phone',
          label: 'End Conversation',
          type: 'ending',
          action: 'ending'
        }
      ],
      defaultValue,
      onSave
    }
  }

}

export default SMSDesigner
