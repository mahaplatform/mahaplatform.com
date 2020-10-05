import ExpenseTypeToken from './tokens/expense_type'
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
      endpoint: '/api/admin/apps/finance/settings',
      action: '/api/admin/apps/finance/settings',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Accouting Platform', name: 'settings.integration', type: 'lookup', placeholder: 'Choose platform', options: [ { value: 'accpac', text: 'ACCPAC' }, { value: 'accumatica', text: 'Accumatica' }], value: 'value', text: 'text' }
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
