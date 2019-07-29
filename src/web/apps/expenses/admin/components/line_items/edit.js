import ExpenseTypeToken from '../../tokens/expense_type'
import ProjectToken from '../../tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    index: PropTypes.number,
    line_item: PropTypes.object,
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
    const { line_item, projectEndpoint } = this.props
    return {
      title: 'Edit Line Item',
      saveText: 'Update',
      onSubmit: this._handleSubmit,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'id', type: 'hidden', defaultValue: line_item.id },
            { label: 'Project', name: 'project_id', required: true, type: 'lookup', placeholder: 'Choose a project', endpoint: projectEndpoint, value: 'id', text: 'title', format: ProjectToken, defaultValue: line_item.project_id },
            { label: 'Expense Type', name: 'expense_type_id', required: true, type: 'lookup', placeholder: 'Choose an expense type', endpoint: '/api/admin/expenses/expense_types/active', value: 'id', text: 'title', format: ExpenseTypeToken, defaultValue: line_item.expense_type_id },
            { label: 'Description', name: 'description', required: true, placeholder: 'Describe the line item', type: 'textfield', defaultValue: line_item.description },
            { label: 'Amount', name: 'amount', required: true, placeholder: 'Enter the amount', type: 'moneyfield', defaultValue: line_item.amount },
            { label: 'Tax', name: 'tax', required: true, placeholder: 'Enter the tax', type: 'moneyfield', defaultValue: line_item.tax }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSubmit(line_item) {
    const { index } = this.props
    this.props.onSubmit(line_item, index)
    return true
  }

  _handleSuccess(result) {
    this.context.form.pop()
  }

}

export default Edit
