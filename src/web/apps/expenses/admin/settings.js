import ExpenseTypeToken from './tokens/expense_type_token'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

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
      title: 'Edit Settings',
      method: 'patch',
      endpoint: '/api/admin/apps/expenses/settings',
      action: '/api/admin/apps/expenses/settings',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Accouting Platform', name: 'settings.integration', type: 'lookup', placeholder: 'Choose platform', options: [ { value: 'accpac', text: 'Sage ACCPAC' }, { value: 'blackbaud', text: 'Blackbaud Financial Edge' }] },
            { label: 'Mileage Expense Type', name: 'settings.trip_expense_type_id', type: 'lookup', placeholder: 'Expense Type', endpoint: '/api/admin/expenses/expense_types', value: 'id', text: 'title', format: ExpenseTypeToken }
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
