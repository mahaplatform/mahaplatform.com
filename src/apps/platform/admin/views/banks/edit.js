import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    bank: PropTypes.object,
    team_id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { bank } = this.props
    return {
      title: 'Edit Bank Account',
      method: 'patch',
      endpoint: `/api/admin/platform/banks/${bank.id}/edit`,
      action: `/api/admin/platform/banks/${bank.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Braintree ID', name: 'braintree_id', type: 'lookup', endpoint: '/api/admin/platform/banks/lookup', placeholder: 'Choose a Braintree ID', value: 'id', text: 'id', required: true },
            { label: 'Rate', name: 'rate', type: 'ratefield', placeholder: 'Rate', required: true, defaultValue: 0.029 },
            { label: 'Amex Rate', name: 'amex_rate', type: 'ratefield', placeholder: 'Amex Rate', required: true, defaultValue: 0.0375 },
            { label: 'ACH Rate', name: 'ach_rate', type: 'ratefield', placeholder: 'ACH Rate', required: true, defaultValue: 0.0075 },
            { name: 'has_ach', type: 'checkbox', prompt: 'ACH enabled' },
            { name: 'has_paypal', type: 'checkbox', prompt: 'PayPal enabled' }
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
