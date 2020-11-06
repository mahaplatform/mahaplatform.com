import React from 'react'
import PropTypes from 'prop-types'
import { Form } from '@admin'

class Password extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  state = {
    password: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Change Password',
      method: 'patch',
      action: '/api/admin/account/security/password',
      cancelIcon: 'chevron-left',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'New Password', name: 'password', type: 'password', placeholder: 'New Password', required: true },
            { label: 'Confirm Password', name: 'confirmation', type: 'password', placeholder: 'Confirm Password', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleSuccess(user) {
    this.context.modal.pop()
  }

}

export default Password
