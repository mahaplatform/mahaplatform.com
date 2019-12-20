import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Edit Coupon',
      method: 'patch',
      endpoint: `/api/admin/finance/coupons/${id}/edit`,
      action: `/api/admin/finance/coupons/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Enter a code', required: true },
            { label: 'Product', name: 'product_id', type: 'lookup', placeholder: 'Choose a product', endpoint: '/api/admin/finance/products', value: 'id', text: 'title', required: true },
            { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter an amount' },
            { label: 'Percent', name: 'percent', type: 'moneyfield', placeholder: 'Enter a percent' },
            { label: 'Active', name: 'is_active', type: 'checkbox' }
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
