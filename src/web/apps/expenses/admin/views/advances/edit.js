import ExpenseTypeToken from '../../tokens/expense_type_token'
import ProjectToken from '../../tokens/project_token'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    projectEndpoint: PropTypes.string,
    advance: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { advance, projectEndpoint } = this.props
    return {
      title: 'Edit Cash Advance',
      method: 'patch',
      endpoint: `/api/admin/expenses/advances/${advance.id}/edit`,
      action: `/api/admin/expenses/advances/${advance.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date Needed', name: 'date_needed', type: 'datefield', required: true, placeholder: 'Date Needed', defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Description', name: 'description', type: 'textfield', required: true },
            { label: 'Amount', name: 'amount', type: 'moneyfield', required: true },
            { label: 'Project', name: 'project_id', type: 'lookup', endpoint: projectEndpoint, value: 'id', text: 'title', format: ProjectToken },
            { label: 'Expense Type', name: 'expense_type_id', type: 'lookup', placeholder: 'Expense Type', endpoint: '/api/admin/expenses/expense_types/active', value: 'id', text: 'title', format: ExpenseTypeToken }
          ]
        }
      ]
    }
  }


  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
