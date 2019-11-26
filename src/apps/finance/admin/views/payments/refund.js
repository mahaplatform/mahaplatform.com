import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class Refund extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    payment: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { payment } = this.props
    return {
      title: 'refund Payment',
      method: 'post',
      action: `/api/admin/finance/payments/${payment.id}/refunds`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Strategy', name: 'strategy', type: 'radiogroup', options: ['card','credit'], required: true, defaultValue: 'card' },
            { label: 'Amount', name: 'amount', type: 'moneyfield', placeholder: 'Amount', required: true, defaultValue: payment.refundable }
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

export default Refund
