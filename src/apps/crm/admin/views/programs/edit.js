import BankToken from '@apps/finance/admin/tokens/bank'
import PropTypes from 'prop-types'
import { Form } from '@admin'
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
          label: 'Finance',
          fields: [
            { label: 'Bank', name: 'bank_id', type: 'lookup', placeholder: 'Choose a bank account', endpoint: '/api/admin/finance/banks', filter: { status: { $eq: 'active' } }, value: 'id', text: 'title', format: BankToken },
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
