import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number,
    integration: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Edit Vendors',
      method: 'patch',
      endpoint: `/api/admin/expenses/vendors/${id}`,
      action: `/api/admin/expenses/vendors/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield' },
            { label: 'Address 1', name: 'address_1', type: 'textfield' },
            { label: 'Address 2', name: 'address_2', type: 'textfield' },
            { label: 'City', name: 'city', type: 'textfield' },
            { label: 'State', name: 'state', type: 'textfield' },
            { label: 'Zip', name: 'zip', type: 'textfield' }
          ]
        },
        ...this._getIntegration()
      ]
    }
  }

  _getIntegration() {
    if(this.props.integration === 'accpac') {
      return [
        {
          label: 'ACCPAC Details',
          fields: [
            { label: 'Vendor ID', name: 'integration.vendor_id', type: 'textfield', required: true }
          ]
        }
      ]
    }
    return []
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
