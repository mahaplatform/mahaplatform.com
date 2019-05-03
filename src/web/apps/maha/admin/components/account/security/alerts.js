import AppItems from './appitems'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class AlertForm extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Security Alerts',
      method: 'patch',
      endpoint: '/api/admin/account/security',
      action: '/api/admin/account/security/alerts',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Alerts', name: 'ignored', endpoint: '/api/admin/account/security/alerts', instructions: 'We can send you email alerts when we detect suspcious actvity with your account. Please indicate which alerts you would like to receive', type: AppItems }
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

export default AlertForm
