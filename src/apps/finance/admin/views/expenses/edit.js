import Allocations from '../../components/allocations'
import VendorToken from '../../tokens/vendor'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    expense: PropTypes.object,
    projectEndpoint: PropTypes.string
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
    const { expense, projectEndpoint } = this.props
    const { tax_total, total } = this.state
    return {
      title: 'Edit Expense',
      method: 'patch',
      endpoint: `/api/admin/finance/expenses/${expense.id}/edit`,
      action: `/api/admin/finance/expenses/${expense.id}`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date of Purchase', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Choose a vendor', endpoint: '/api/admin/finance/vendors', value: 'id', text: 'name', form: this._getVendorForm(), format: VendorToken },
            { label: 'Account', name: 'account_id', type: 'lookup', placeholder: 'Choose an account', endpoint: '/api/admin/finance/accounts', value: 'id', text: 'name' },
            { label: 'Receipt', name: 'receipt_ids', type: 'filefield', multiple: true, prompt: 'Upload Receipt', endpoint: '/api/admin/finance/receipts' },
            { label: 'Total', name: 'total', type: 'moneyfield', required: true, placeholder: 'Enter the full amount minus the tax' },
            { label: 'Tax', name: 'tax_total', type: 'moneyfield', required: true, placeholder: 'Enter the tax paid if any' },
            { label: 'Allocations', name: 'allocations', type: Allocations, projectEndpoint, tax_total, total }
          ]
        }
      ]
    }
  }

  _getVendorForm() {
    return {
      title: 'New Vendor',
      method: 'post',
      action: '/api/admin/finance/vendors',
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

export default Edit
