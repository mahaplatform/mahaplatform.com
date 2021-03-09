import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    bank: PropTypes.object,
    integration: PropTypes.string
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { bank } = this.props
    return {
      title: 'Edit Bank Account',
      method: 'patch',
      endpoint: `/api/admin/finance/banks/${bank.id}/edit`,
      action: `/api/admin/finance/banks/${bank.id}`,
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
    const { integration } = this.props
    if(_.includes(['accpac','accumatica'], integration)) {
      return [{
        label: integration === 'accpac' ? 'ACCPAC Details' : 'Accumatica Details',
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
