import ExpenseTypeToken from '../../tokens/expense_type'
import ProjectToken from '../../tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    projectEndpoint: PropTypes.string,
    onSubmit: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { projectEndpoint } = this.props
    return {
      title: 'New Allocation',
      saveText: 'Done',
      onSubmit: this._handleSubmit,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Project', name: 'project_id', required: true, type: 'lookup', placeholder: 'Choose a project', endpoint: projectEndpoint, value: 'id', text: 'display', format: ProjectToken },
            { label: 'Expense Type', name: 'expense_type_id', required: true, type: 'lookup', placeholder: 'Choose an expense type', endpoint: '/api/admin/finance/expense_types/active', value: 'id', text: 'display', format: ExpenseTypeToken },
            { label: 'Description', name: 'description', required: true, placeholder: 'Describe the line item', type: 'textfield' },
            { label: 'Amount', name: 'amount', required: true, placeholder: 'Enter the amount', type: 'moneyfield' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSubmit(allocation) {
    this.props.onSubmit(allocation)
    return true
  }

  _handleSuccess(result) {
    this.context.form.pop()
  }

}

export default New
