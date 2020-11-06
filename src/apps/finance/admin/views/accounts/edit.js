import React from 'react'
import PropTypes from 'prop-types'
import { Form } from '@admin'

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
      title: 'Edit Accounts',
      method: 'patch',
      endpoint: `/api/admin/finance/accounts/${id}`,
      action: `/api/admin/finance/accounts/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', required: true }
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
            { label: 'Vendor ID', name: 'integration.vendor_id', type: 'textfield' }
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
