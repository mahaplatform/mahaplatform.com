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
    projectEndpoint: PropTypes.string,
    reimbursement: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  state = {
    total: 0.00
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { projectEndpoint, reimbursement } = this.props
    const { total } = this.state
    return {
      title: 'Edit Reimbursement',
      method: 'patch',
      endpoint: `/api/admin/expenses/reimbursements/${reimbursement.id}/edit`,
      action: `/api/admin/expenses/reimbursements/${reimbursement.id}`,
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date of Purchase', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Choose a vendor', endpoint: '/api/admin/expenses/vendors', value: 'id', text: 'name', form: this._getVendorForm(), format: VendorToken },
            { label: 'Receipt', name: 'receipt_ids', type: 'filefield', multiple: true, prompt: 'Upload Receipt', action: '/api/admin/assets/upload', endpoint: '/api/admin/expenses/receipts' },
            { label: 'Total', name: 'total', type: 'moneyfield', required: true, placeholder: 'Enter the full amount minus the tax' },
            { label: 'Allocations', name: 'line_items', type: LineItems, projectEndpoint, total }
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
