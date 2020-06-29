import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    merchant: PropTypes.object,
    integration: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { merchant } = this.props
    return {
      title: 'Edit Merchant Account',
      method: 'patch',
      endpoint: `/api/admin/finance/merchants/${merchant.id}/edit`,
      action: `/api/admin/finance/merchants/${merchant.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true }
          ]
        },
        ...this._getIntegration()
      ]
    }
  }

  _getIntegration() {
    if(this.props.integration === 'accpac') {
      return [{
        label: 'ACCPAC Details',
        fields: [
          { label: 'Bank Code', name: 'integration.bank_code', type: 'textfield', placeholder: 'Enter a bank code', required: true }
        ]
      }]
    }
    return []
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(invoice) {
    this.context.modal.close()
  }

}

export default Edit
