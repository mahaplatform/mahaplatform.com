import RefundStrategyToken from '../../tokens/refund_strategy'
import AmountField from '../../components/amountfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

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
    const strategies = this._getStrategies()
    return {
      title: 'Refund Payment',
      method: 'post',
      action: `/api/admin/finance/payments/${payment.id}/refunds`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Type', name: 'type', type: 'radiogroup', options: strategies, format: RefundStrategyToken, required: true },
            { label: 'Amount', name: 'amount', type: AmountField, required: true, balance: payment.refundable }
          ]
        }
      ]
    }
  }

  _getStrategies() {
    const { method } = this.props.payment
    const strategies = []
    if(method === 'ach') {
      strategies.push('ach')
    } else if(method === 'paypal') {
      strategies.push('paypal')
    } else if(_.includes(['card','googlepay','applepay'], method)) {
      strategies.push('card')
    }
    strategies.push('credit')
    return strategies
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Refund
