import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
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
    const { bank, team_id } = this.props
    return {
      title: 'Edit Bank Account',
      method: 'patch',
      endpoint: `/api/admin/platform/teams/${team_id}/banks/${bank.id}/edit`,
      action: `/api/admin/platform/teams/${team_id}/banks/${bank.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Braintree ID', name: 'braintree_id', type: 'lookup', endpoint: `/api/admin/platform/teams/${team_id}/banks/lookup`, placeholder: 'Choose a Braintree ID', value: 'id', text: 'id', required: true },
            { label: 'Rate', name: 'rate', type: 'numberfield', placeholder: 'Rate', required: true, defaultValue: '0.029' },
            { label: 'Amex Rate', name: 'amex_rate', type: 'numberfield', placeholder: 'Amex Rate', required: true, defaultValue: '0.0375' },
            { label: 'ACH Rate', name: 'ach_rate', type: 'numberfield', placeholder: 'ACH Rate', required: true, defaultValue: '0.0075' }
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
