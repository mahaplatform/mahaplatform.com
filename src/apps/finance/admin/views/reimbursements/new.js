import Allocations from '../../components/allocations'
import VendorToken from '../../tokens/vendor'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import moment from 'moment'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

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
    const { total } = this.state
    return {
      title: 'New Reimbursement',
      method: 'post',
      action: '/api/admin/finance/reimbursements',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date of Purchase', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Choose a vendor', endpoint: '/api/admin/finance/vendors', value: 'id', text: 'name', form: this._getVendorForm(), format: VendorToken },
            { label: 'Receipt', name: 'receipt_ids', type: 'attachmentfield', allow: { content_types: ['application/pdf','image'] }, multiple: true, prompt: 'Upload Receipt' },
            { label: 'Total', name: 'total', type: 'moneyfield', required: true, placeholder: 'Enter the full amount minus the tax' },
            { label: 'Allocations', name: 'allocations', type: Allocations, total }
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
            { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Enter a name' },
            { label: 'Address', name: 'address', type: 'addressfield' }
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

export default New
