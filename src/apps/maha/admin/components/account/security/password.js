import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Password extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  state = {
    password: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const passwordSchema = [
      'digits', 'symbols', 'uppercase',
      { rule: 'min', value: 8 }
    ]
    const confirmSchema = [
      ...passwordSchema,
      { rule: 'oneOf', value: [this.state.password] }
    ]
    return {
      title: 'Change Password',
      method: 'patch',
      action: '/api/admin/account/security/password',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          instructions: (
            <div>
              <p>Your new password must contain:</p>
              <ul>
                <li>at least 8 characters</li>
                <li>at least 1 digit</li>
                <li>at least 1 uppercase letter</li>
                <li>at least 1 symbol</li>
              </ul>
            </div>
          ),
          fields: [
            { label: 'New Password', name: 'password', type: 'password', placeholder: 'New Password', required: true, schema: passwordSchema },
            { label: 'Confirm Password', name: 'confirmation', type: 'password', placeholder: 'Confirm Password', required: true, schema: confirmSchema }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleChangeField(name, password) {
    if(name !== 'password') return
    this.setState({ password })
  }

  _handleSuccess(user) {
    this.context.modal.pop()
  }

}

export default Password
