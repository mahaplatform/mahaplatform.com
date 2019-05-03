import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Edit extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Edit Account',
      method: 'patch',
      endpoint: '/api/admin/account',
      action: '/api/admin/account',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'First Name', required: true },
            { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Last Name', required: true },
            { label: 'Email', name: 'email', type: 'textfield', placeholder: 'Email', required: true },
            { label: 'Secondary Email', name: 'secondary_email', type: 'textfield', placeholder: 'Secondary Email', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleSuccess() {
    this.context.modal.pop()
  }

}

export default Edit
