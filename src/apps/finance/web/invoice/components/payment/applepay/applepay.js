import { Form, ModalPanel } from 'maha-public'
import AmountField from '../amountfield'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class ApplePay extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    payment: PropTypes.object,
    token: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onSubmit: PropTypes.func
  }

  state = {
    amount: 0.00
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-payment-applepay">
          <div className="finance-payment-applepay-body">
            <Form { ...this._getForm() } />
          </div>
          <div className="finance-payment-applepay-footer">
            <div className="apple-pay-button apple-pay-button-white" />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { payment } = this.props
    const { amount } = this.state
    if(!_.isEqual(payment, prevProps.payment)) {
      this.props.onDone({
        amount,
        method: 'applepay',
        payment
      })
    }
  }

  _getForm() {
    const { invoice } = this.props
    return {
      inline: true,
      onChange: this._handleChange,
      fields: [
        { label: 'Amount', name: 'amount', type: AmountField, required: true, balance: invoice.balance }
      ]
    }
  }

  _getPanel() {
    return {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      title: 'ApplePay'
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange({ amount }) {
    this.setState({ amount })
  }

  _handlePayment() {
    const { amount } = this.state
    const { token } = this.props
    this.props.onSubmit(token, amount)
  }

}

export default ApplePay
