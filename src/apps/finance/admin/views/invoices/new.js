import ProgramToken from '../../../../crm/admin/tokens/program'
import LineItems from '../../components/line_items'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Customer Invoice',
      method: 'post',
      action: '/api/admin/finance/invoices',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Customer', name: 'customer_id', type: 'lookup', placeholder: 'Choose a customer', endpoint: '/api/admin/crm/contacts', value: 'id', text: 'display_name', required: true },
            { label: 'Program', name: 'program_id', type: 'lookup', placeholder: 'Choose a program', endpoint: '/api/admin/crm/programs', value: 'id', text: 'title', required: true, format: ProgramToken },
            { label: 'Date', name: 'date', type: 'datefield', placeholder: 'Date', required: true, defaultValue: moment() },
            { label: 'Due', name: 'due', type: 'datefield', placeholder: 'Date', required: true, defaultValue: moment() },
            { label: 'Line Items', name: 'line_items', type: LineItems, required: true },
            { label: 'Notes', name: 'notes', type: 'textarea', placeholder: 'Add notes' }

          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(invoice) {
    this.context.router.history.push(`/admin/finance/invoices/${invoice.id}`)
    this.context.modal.close()
  }

}

export default New
