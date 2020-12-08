import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

const actions = {
  receive: {
    title: 'Email is Delivered',
    description: 'Trigger workflow when contact receives the email'
  },
  open: {
    title: 'Email is Opened',
    description: 'Trigger workflow when contact opens the email'
  },
  click: {
    title: 'Email is Clicked',
    description: 'Trigger workflow when contact clicks on a link in the email'
  }
}

const WorkflowActionToken = ({ value }) => {
  const action = actions[value]
  return (
    <div className="token">
      <strong>{ action.title }</strong><br />
      { action.description }
    </div>
  )
}

WorkflowActionToken.propTypes = {
  value: PropTypes.string
}

class Workflow extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    campaign: PropTypes.object
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { campaign } = this.props
    return {
      title: 'Create Workflow',
      method: 'post',
      action: '/api/admin/automation/workflows',
      onCancel: this._handleBack,
      onSuccess: this._handleDone,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: campaign.program.id },
            { name: 'campaign_id', type: 'hidden', defaultValue: campaign.id },
            { name: 'status', type: 'hidden', defaultValue: 'active' },
            { name: 'trigger_type', type: 'hidden', defaultValue: 'email_campaign' },
            { type: 'segment', fields: [
              { name: 'action', type: 'radiogroup', options: ['delivery','open','click'], required: true, deselectable: false, format: WorkflowActionToken, defaultValue: 'add' },
              { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title' },
              { name: 'is_unique', type: 'checkbox', prompt: 'Contacts can only be enrolled in this workflow once' }
            ] }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.context.modal.close()
  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default Workflow
