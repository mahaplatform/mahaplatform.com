import AmountField from '@apps/finance/admin/components/amountfield'
import ItemsField from '../itemsfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import numeral from 'numeral'
import React from 'react'
import _ from 'lodash'

class Cancel extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    configuration: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object,
    order: PropTypes.object
  }

  state = {
    data: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { store, order } = this.props
    return {
      title: 'Cancel / Refund Order',
      method: 'patch',
      endpoint: `/api/admin/stores/stores/${store.id}/orders/${order.id}`,
      action: `/api/admin/stores/stores/${store.id}/orders/${order.id}/cancel`,
      onChange: this._handleChange,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Order', name: 'order_strategy', type: 'radiogroup', deselectable: false, options: [
              { value: 'cancel', text: 'Cancel the whole order' },
              { value: 'refund', text: 'Refund one or more items from this order' }
            ] },
            ...this._getRefund()
          ]
        }
      ]
    }
  }

  _getBalance() {
    const { order } = this.props
    const { data } = this.state
    const { allocations } = order.payment
    if(!allocations) return '0.00'
    return numeral(allocations.filter(allocation => {
      return _.includes(data.allocations, allocation.line_item.id)
    }).reduce((total, allocation) => {
      return total + Number(allocation.line_item.refundable)
    }, 0.00)).format('0.00')
  }

  _getRefund() {
    const { data } = this.state
    if(!data.order_strategy) return []
    const { method } = this.props.order.payment
    const strategies = []
    if(data.order_strategy === 'cancel') {
      strategies.push({ value: 'nothing', text: 'Do not issue a refund' })
    }
    if(method === 'ach') {
      strategies.push({ value: 'ach', text: 'Refund money to bank account' })
    } else if(method === 'paypal') {
      strategies.push({ value: 'paypal', text: 'Refund money to paypal account' })
      strategies.push('paypal')
    } else if(_.includes(['card','googlepay','applepay'], method)) {
      strategies.push({ value: method, text: 'Refund money to credit card' })
    }
    strategies.push({ value: 'credit', text: 'Refund money to customer credit' })
    return [
      { label: 'Refund', type: 'segment', fields: [
        { name: 'refund_strategy', type: 'radiogroup', deselectable: false, options: strategies, required: true },
        ...this._getRefundDetails()
      ] }
    ]
  }

  _getRefundDetails() {
    const { order,store } = this.props
    const { data } = this.state
    if(!data.refund_strategy || data.refund_strategy === 'nothing') return []
    const balance = this._getBalance()
    const fields = [
      { label: 'Apply To', name: 'allocations', type: ItemsField, allocations: order.payment.items, required: true }
    ]
    if(balance > 0) {
      fields.push({ label: 'Amount', name: 'amount', type: AmountField, required: true, balance })
    }
    return fields
  }

  _handleChange(data) {
    this.setState({ data })
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Cancel
