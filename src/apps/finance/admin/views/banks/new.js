import RoutingNumberField from '../../components/routingnumberfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
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
      title: 'New Bank Account',
      method: 'post',
      action: '/api/admin/finance/banks',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true },
            { label: 'Routing Number', name: 'routing', type: RoutingNumberField, required: true },
            { label: 'Account Number', name: 'account_number', type: 'textfield', placeholder: 'Enter an account number', required: true }
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
          { label: 'Bank Code', name: 'integration.bank_code', type: 'textfield', placeholder: 'Enter a bank code' }
        ]
      }]
    }
    return []
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(invoice) {
    this.context.router.history.push(`/finance/banks/${invoice.id}`)
    this.context.modal.close()
  }

}

export default New
