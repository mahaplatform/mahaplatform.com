import { Form } from 'maha-public'
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
    const { invoice } = this.props
    return {
      title: 'Credit Card',
      cancelIcon: 'chevron-left',
      saveButton: 'Make Payment',
      onCancel: this._handleBack,
      onSubmit: this._handleAuthorize,
      fields: [
        { label: 'Number', name: 'number', type: 'textfield', required: true },
        { label: 'Expiration', name: 'expirationDate', type: 'textfield', required: true },
        { label: 'CVV', name: 'cvv', type: 'textfield', required: true },
        { label: 'Amount', name: 'amount', type: 'textfield', required: true, defaultValue: invoice.balance }
      ]
    }
  }

  _handleAuthorize(data) {
    const { token } = this.props
    const { amount, number, expirationDate, cvv } = data
    this.setState({ amount })
    this.props.onAuthorize(token, { number, expirationDate, cvv })
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default Card
