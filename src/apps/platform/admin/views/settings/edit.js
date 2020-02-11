import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Edit Settingss',
      method: 'patch',
      endpoint: '/api/admin/platform/settings',
      action: '/api/admin/platform/settings',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          label: 'Payments',
          fields: [
            { prompt: 'Enable ACH', name: 'ach_enabled', type: 'checkbox' },
            { prompt: 'Enable ApplePay', name: 'applepay_enabled', type: 'checkbox' },
            { prompt: 'Enable GooglePay', name: 'googlepay_enabled', type: 'checkbox' },
            { prompt: 'Enable PayPal', name: 'paypal_enabled', type: 'checkbox' }
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
