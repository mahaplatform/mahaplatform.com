import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Coupon',
      method: 'post',
      action: '/api/admin/finance/coupons',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Enter a code', required: true },
            { label: 'Product', name: 'product_id', type: 'lookup', placeholder: 'Choose a product', endpoint: '/api/admin/finance/products', value: 'id', text: 'title', required: true },
            { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Enter an amount' },
            { label: 'Percent', name: 'percent', type: 'moneyfield', placeholder: 'Enter a percent' }
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

export default New
