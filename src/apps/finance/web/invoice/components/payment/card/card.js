import AmountField from '../amountfield'
import CardField from './cardfield'
import { Form } from '@public'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Card extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    payment: PropTypes.object,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onSubmit: PropTypes.func
  }

  state = {
    amount: 0.00
  }

  _handleBack = this._handleBack.bind(this)
  _handleAuthorize = this._handleAuthorize.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidUpdate(prevProps) {
    const { payment } = this.props
    const { amount } = this.state
    if(!_.isEqual(payment, prevProps.payment)) {
      this.props.onDone({
        amount,
        method: 'card',
        payment
      })
    }
  }

  _getForm() {
    const { invoice, token } = this.props
    return {
      modal: false,
      title: 'Credit Card',
      cancelIcon: 'chevron-left',
      saveButton: 'Make Payment',
      onCancel: this._handleBack,
      onSubmit: this._handleAuthorize,
      fields: [
        { label: 'Card', name: 'card', type: CardField, required: true, token },
        { label: 'Amount', name: 'amount', type: AmountField, required: true, balance: invoice.balance }
      ]
    }
  }

  _handleAuthorize(data) {
    const { token } = this.props
    const { amount, card } = data
    this.setState({ amount })
    this.props.onAuthorize(token, card)
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default Card
