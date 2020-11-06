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
      title: 'Edit Revenue Type',
      method: 'patch',
      endpoint: `/api/admin/finance/revenue_types/${id}`,
      action: `/api/admin/finance/revenue_types/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Description', name: 'description', type: 'textarea' },
            { label: 'Active', name: 'is_active', type: 'checkbox' }
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
            { label: 'Revenue Code', name: 'integration.revenue_code', type: 'textfield', required: true },
            { label: 'Source Code', name: 'integration.source_code', type: 'textfield' }
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
