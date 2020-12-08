import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

const trigger_types = {
  subscription_created: {
    title: 'Added to List',
    description: 'Trigger workflow when contact is added to list'
  },
  subscription_deleted: {
    title: 'Removed from List',
    description: 'Trigger workflow when contact is removed from list'
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
    list: PropTypes.object
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { list } = this.props
    return {
      title: 'Create Workflow',
      method: 'post',
      action: '/api/admin/automation/workflows',
      onCancel: this._handleBack,
      onSuccess: this._handleDone,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: list.program.id },
            { name: 'list_id', type: 'hidden', defaultValue: list.id },
            { name: 'status', type: 'hidden', defaultValue: 'active' },
            { type: 'segment', fields: [
              { name: 'trigger_type', type: 'radiogroup', options: Object.keys(trigger_types), required: true, deselectable: false, format: WorkflowActionToken, defaultValue: 'subscription_created' },
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
