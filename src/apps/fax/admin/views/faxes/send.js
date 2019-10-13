import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Send extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Send Fax',
      method: 'post',
      action: '/api/admin/team/faxes',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'From', name: 'number_id', type: 'lookup', placeholder: 'Choose Sending Number', endpoint: '/api/admin/team/numbers', filter: { type: { $eq: 'fax' } }, value: 'id', text: 'number', required: true },
            { label: 'To', name: 'to', type: 'textfield', placeholder: 'Enter To Number', required: true },
            { label: 'Document', name: 'asset_id', type: 'attachmentfield', prompt: 'Choose Document', multiple: false, required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Send
