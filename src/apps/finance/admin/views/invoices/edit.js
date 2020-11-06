import ProgramToken from '@apps/crm/admin/tokens/program'
import ContactToken from '@apps/crm/admin/tokens/contact'
import LineItems from '../../components/line_items'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { invoice } = this.props
    return {
      title: 'Edit Invoice',
      method: 'patch',
      endpoint: `/api/admin/finance/invoices/${invoice.id}/edit`,
      action: `/api/admin/finance/invoices/${invoice.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { type: 'fields', fields: [
              { label: 'Program', name: 'program_id', type: 'lookup', placeholder: 'Choose a program', endpoint: '/api/admin/crm/programs', filter: { bank_id: { $eq: 'not_null' } }, value: 'id', text: 'title', required: true, format: ProgramToken },
              { label: 'Customer', name: 'customer_id', type: 'lookup', placeholder: 'Choose a customer', endpoint: '/api/admin/crm/contacts', value: 'id', text: 'display_name', required: true, format: ContactToken }
            ] },
            { type: 'fields', fields: [
              { label: 'Date', name: 'date', type: 'datefield', placeholder: 'Date', required: true },
              { label: 'Due', name: 'due', type: 'datefield', placeholder: 'Date', required: true }
            ] },
            { label: 'Notes', name: 'notes', type: 'textfield', placeholder: 'Add notes' },
            { label: 'Line Items', name: 'details', type: LineItems, required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(invoice) {
    this.context.modal.close()
  }

}

export default Edit
