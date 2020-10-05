import ExpenseTypeToken from '../../tokens/expense_type'
import ProjectToken from '../../tokens/project'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Cash Advance',
      method: 'post',
      action: '/api/admin/finance/advances',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date Needed', name: 'date_needed', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Description', name: 'description', type: 'textfield', placeholder: 'Describe the advance', required: true },
            { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter the amount', required: true },
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Choose a project', endpoint: '/api/admin/finance/memberships', value: 'id', text: 'display', format: ProjectToken },
            { label: 'Expense Type', name: 'expense_type_id', type: 'lookup', placeholder: 'Choose an expense type', endpoint: '/api/admin/finance/expense_types', value: 'id', text: 'display', format: ExpenseTypeToken }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(expense) {
    const { modal } = this.context
    modal.close()
  }

}


export default New
