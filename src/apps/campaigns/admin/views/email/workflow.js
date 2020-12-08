import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

const trigger_types = {
  email_received: {
    title: 'Email is Delivered',
    description: 'Trigger workflow when contact receives the email'
  },
  email_opened: {
    title: 'Email is Opened',
    description: 'Trigger workflow when contact opens the email'
  },
  email_clicked: {
    title: 'Email is Clicked',
    description: 'Trigger workflow when contact clicks on a link in the email'
  }
}

const WorkflowActionToken = ({ value }) => {
  const action = trigger_types[value]
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
            { name: 'email_campaign_id', type: 'hidden', defaultValue: campaign.id },
            { name: 'status', type: 'hidden', defaultValue: 'active' },
            { type: 'segment', fields: [
              { name: 'trigger_type', type: 'radiogroup', options: Object.keys(trigger_types), required: true, deselectable: false, format: WorkflowActionToken, defaultValue: 'email_received' },
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
