import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class VendorsNew extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    integration: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Vendor',
      method: 'post',
      action: '/api/admin/finance/vendors',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Enter a name' },
            { label: 'Address', name: 'address', type: 'addressfield' }
          ]
        },
        ...this._getIntegration()
      ]
    }
  }

  _getIntegration() {
    const { integration } = this.props
    if(_.includes(['accpac','accumatica'], integration)) {
      return [{
        label: integration === 'accpac' ? 'ACCPAC Details' : 'Accumatica Details',
        fields: [
          { label: 'Vendor ID', name: 'integration.vendor_id', type: 'textfield', required: true, placeholder: 'Enter a vendor ID' }
        ]
      }]
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

export default VendorsNew
