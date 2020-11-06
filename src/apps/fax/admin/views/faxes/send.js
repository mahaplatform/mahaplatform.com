import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Send extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    numbers: PropTypes.array
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
      action: '/api/admin/fax/faxes',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      saveText: 'Send',
      sections: [
        {
          fields: [
            ...this._getFrom(),
            { label: 'To', name: 'to', type: 'phonefield', placeholder: 'Enter To Number', required: true },
            { label: 'Document', name: 'asset_id', type: 'attachmentfield', prompt: 'Choose Document', multiple: false, required: true }
          ]
        }
      ]
    }
  }

  _getFrom() {
    const { numbers } = this.props
    if(numbers.length > 1) {
      return [{ label: 'From', name: 'from_number_id', type: 'lookup', placeholder: 'Choose From Number', endpoint: '/api/admin/fax/numbers', filter: { type: { $eq: 'fax' } }, value: 'id', text: 'formatted', required: true }]
    } else if(numbers.length === 1) {
      return [{ name: 'from_number_id', type: 'hidden', defaultValue: numbers[0].id }]
    }
    return []
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Send
