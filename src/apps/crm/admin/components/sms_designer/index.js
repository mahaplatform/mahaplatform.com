import WorkflowDesigner from '../workflow_designer'
import PropTypes from 'prop-types'
import Question from './question'
import Message from './message'
import Listen from './listen'
import React from 'react'

class SMSDesigner extends React.PureComponent {

  static propTypes = {
    campaign: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    return <WorkflowDesigner { ...this._getWorkflowDesigner() } />
  }

  _getWorkflowDesigner() {
    const { campaign, onSave } = this.props
    const { steps, term } = campaign
    return {
      blocks: [
        {
          icon: 'comment',
          label: 'Incoming SMS',
          type: 'trigger',
          action: 'trigger',
          details: () => `"${term}"`
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
      defaultValue: steps,
      onSave
    }
  }

}

export default SMSDesigner
