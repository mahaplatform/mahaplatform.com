import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

const actions = {
  add: {
    title: 'Added to List',
    description: 'Trigger workflow when contact is added to list'
  },
  remove: {
    title: 'Removed from List',
    description: 'Trigger workflow when contact is removed from list'
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

class List extends React.PureComponent {

  static propTypes = {
    program_id: PropTypes.number,
    trigger_type: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program_id , trigger_type} = this.props
    return {
      title: 'Create Workflow',
      method: 'post',
      action: '/api/admin/crm/workflows',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onSuccess: this._handleDone,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { name: 'trigger_type', type: 'hidden', defaultValue: trigger_type },
            { label: 'Title', name: 'title', type: 'textfield', required: true, defaultValue: 'List Update Workflow' },
            { label: 'Action', name: 'action', type: 'radiogroup', options: ['add','remove'], required: true, format: WorkflowActionToken, defaultValue: 'add' },
            { label: 'List', name: 'list_id', type: 'lookup', required: true, endpoint: `/api/admin/crm/programs/${program_id}/lists`, value: 'id', text: 'title', filter: { program_id: { $eq: program_id } } },
            { label: 'Configuration', type: 'segment', fields: [
              { name: 'is_unique', type: 'checkbox', prompt: 'contacts can only be enrolled once' }
            ] }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone(result) {
    this.props.onDone(result)
  }

}

export default List
