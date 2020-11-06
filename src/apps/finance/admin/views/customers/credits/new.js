import ProgramToken from '@apps/crm/admin/tokens/program'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Credit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    customer: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { customer } = this.props
    return {
      title: 'New Credit',
      method: 'post',
      action: `/api/admin/finance/customers/${customer.id}/credits`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Program', name: 'program_id', type: 'lookup', placeholder: 'Choose a program', endpoint: '/api/admin/crm/programs', value: 'id', text: 'title', required: true, format: ProgramToken },
            { label: 'Description', name: 'description', type: 'textfield', placeholder: 'Describe this credit', required: true },
            { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter an amount', required: true }
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

export default Credit
