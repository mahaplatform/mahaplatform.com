import MerchantToken from '../../../../finance/admin/tokens/merchant'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Edit Program',
      method: 'patch',
      endpoint: `/api/admin/crm/programs/${id}/edit`,
      action: `/api/admin/crm/programs/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Logo', name: 'logo_id', type: 'attachmentfield', prompt: 'Choose Logo', multiple: false, allow: { extensions: ['jpg','jpeg','png','gif'] } }
          ]
        },  {
          label: 'Phone Number',
          fields: [
            { label: 'Number', name: 'phone_number_id', type: 'lookup', placeholder: 'Choose a phone number', endpoint: '/api/admin/phone_numbers', filter: { type: { $eq: 'voice' } }, value: 'id', text: 'formatted' }
          ]
        },  {
          label: 'Finance',
          fields: [
            { label: 'Merchant', name: 'merchant_id', type: 'lookup', placeholder: 'Choose a merchant account', endpoint: '/api/admin/finance/merchants', filter: { status: { $eq: 'active' } }, value: 'id', text: 'title', format: MerchantToken },
            { label: 'Invoice Address', name: 'address', type: 'textarea', rows: 2 }
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
