import LineItems from '../../components/line_items'
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
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { expense } = this.props
    return {
      title: 'Edit Expense',
      method: 'patch',
      endpoint: `/api/admin/expenses/expenses/${expense.id}/edit`,
      action: `/api/admin/expenses/expenses/${expense.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Choose a vendor', endpoint: '/api/admin/expenses/vendors', value: 'id', text: 'name', form: this._getVendorForm(), format: VendorToken },
            { label: 'Account', name: 'account_id', type: 'lookup', placeholder: 'Choose an account', endpoint: '/api/admin/expenses/accounts', value: 'id', text: 'name' },
            { label: 'Receipt', name: 'receipt_ids', type: 'filefield', multiple: true, prompt: 'Upload Receipt', action: '/api/admin/assets/upload', endpoint: '/api/admin/expenses/receipts' },
            { name: 'line_items', type: (props) => <LineItems { ...props } { ...this._getLineItems() } /> }
          ]
        }
      ]
    }
  }

  _getLineItems() {
    const { projectEndpoint } = this.props
    return {
      projectEndpoint
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

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
