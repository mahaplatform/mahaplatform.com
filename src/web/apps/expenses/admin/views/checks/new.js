import LineItems from '../../components/line_items'
import VendorToken from '../../tokens/vendor'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    parent: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  state = {
    tax_total: 0.00,
    total: 0.00
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { tax_total, total } = this.state
    return {
      title: 'New Check Request',
      method: 'post',
      action: '/api/admin/expenses/checks',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date Needed', name: 'date_needed', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Choose a vendor', endpoint: '/api/admin/expenses/vendors', value: 'id', text: 'name', form: this._getVendorForm(), format: VendorToken },
            { label: 'Delivery Method', name: 'delivery_method', type: 'lookup', placeholder: 'Choose a delivery method', options: [ { value: 'mail', text: 'Mail' }, { value: 'pickup', text: 'Pickup' }] },
            { label: 'Account Number', name: 'account_number', type: 'textfield', placeholder: 'Enter the account number' },
            { label: 'Invoice Number', name: 'invoice_number', type: 'textfield', placeholder: 'Enter the invoice number' },
            { label: 'Invoice', name: 'receipt_ids', type: 'filefield', multiple: true, prompt: 'Upload Invoice', action: '/api/admin/assets/upload', endpoint: '/api/admin/expenses/receipts' },
            { label: 'Total', name: 'total', type: 'moneyfield', required: true, placeholder: 'Enter the full amount minus the tax' },
            { label: 'Tax', name: 'tax_total', type: 'moneyfield', required: true, placeholder: 'Enter the tax paid if any' },
            { label: 'Allocation', name: 'line_items', type: LineItems, tax_total, total }
          ]
        }
      ]
    }
  }

  _getVendorForm() {
    return {
      title: 'New Vendor',
      method: 'post',
      action: '/api/admin/expenses/vendors',
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
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChangeField(name, value) {
    if(name === 'tax_total') {
      this.setState({
        tax_total: Number(value)
      })
    }
    if(name === 'total') {
      this.setState({
        total: Number(value)
      })
    }
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default New
