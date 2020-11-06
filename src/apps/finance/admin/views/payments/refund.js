import RefundStrategyToken from '../../tokens/refund_strategy'
import AllocationField from '../../components/allocationfield'
import AmountField from '../../components/amountfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class Refund extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    allocations: PropTypes.array,
    payment: PropTypes.object
  }

  state = {
    refund: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { allocations, payment } = this.props
    return {
      title: 'Refund Payment',
      method: 'post',
      action: `/api/admin/finance/payments/${payment.id}/refunds`,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Type', name: 'type', type: 'radiogroup', options: this._getStrategies(), format: RefundStrategyToken, required: true, defaultValue: 'card' },
            { label: 'Apply To', name: 'allocations', type: AllocationField, allocations, required: true },
            { label: 'Amount', name: 'amount', type: AmountField, required: true, balance: this._getBalance() }
          ]
        }
      ]
    }
  }

  _getBalance() {
    const { allocations } = this.props
    const { refund } = this.state
    return numeral(allocations.filter(allocation => {
      return _.includes(refund.allocations, allocation.line_item.id)
    }).reduce((total, allocation) => {
      return total + Number(allocation.line_item.refundable)
    }, 0.00)).format('0.00')
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

  _handleChange(refund) {
    this.setState({ refund })
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Refund
