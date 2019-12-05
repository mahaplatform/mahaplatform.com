import CardNumberField from '../cardnumberfield'
import { Form } from 'maha-admin'
import Expiration from './expiration'
import creditcard from 'credit-card'
import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.PureComponent {

  static propTypes = {
    payment: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onUpdate: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {},
    onValid: () => {}
  }

  form = null

  state = {
    number: null
  }

  _handleAuthorize = this._handleAuthorize.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    return (
      <div className="finance-card">
        <Form { ...this._getForm() } />
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  componentDidUpdate(prevProps) {
    const { payment, token } = this.props
    if(token !== prevProps.token) {
      this.props.onReady(this._handleValidate)
    }
    if(payment !== prevProps.payment) {
      this.props.onValid(payment)
    }
  }

  _getButton() {
    return {
      label: 'Use a different card',
      className: 'link',
      handler: this._handleClear
    }
  }

  _getForm() {
    return {
      reference: form => this.form = form,
      inline: true,
      onChangeField: this._handleChangeField,
      onSubmit: this._handleAuthorize,
      sections: [
        {
          fields: [
            { type: 'fields', fields: [
              { label: 'Card Number', name: 'number', type: CardNumberField, required: true, rules: [this._handleValidateNumber.bind(this)] },
              { label: 'Card Expiration', name: 'expirationDate', type: Expiration, required: true, rules: [this._handleValidateExp.bind(this)] },
              { label: 'CVV', name: 'cvv', type: 'textfield', placeholder: '123', required: true, rules: [this._handleValidateCVV.bind(this)] }
            ] }
          ]
        }
      ]
    }
  }

  _getIcon() {
    const { payment } = this.props
    const { card_type } = payment
    if(card_type === 'visa') return 'visa'
    if(card_type === 'mastercard') return 'mastercard'
    if(card_type === 'american express') return 'amex'
    if(card_type === 'discover') return 'discover'
    return null
  }

  _handleAuthorize(props) {
    const { token } = this.props
    const { number, cvv, expirationDate } = props
    this.props.onAuthorize(token, { number, cvv, expirationDate })
    return true
  }

  _handleChangeField(key, value) {
    this.props.onChange()
    if(key === 'number') {
      this.setState({
        number: value
      })
    }
  }

  _handleClear() {
    this.props.onClear()
  }

  _handleValidate() {
    this.form.submit()
  }

  _handleValidateCVV(cvv) {
    const { number } = this.state
    if(!number) return
    const type = creditcard.determineCardType(number)
    if(!creditcard.doesCvvMatchType(cvv, type)) {
      throw new Error('Invalid CVV number for this card type')
    }
  }

  _handleValidateExp(exp) {
    const parts = exp.match(/(\d{2})\/(\d{2})/)
    if(parts === null) {
      throw new Error('Invalid date. Must be in the format MM/YY')
    } else if(creditcard.isExpired(parts[1],`20${parts[2]}`)) {
      throw new Error('This date is in the past')
    }
  }

  _handleValidateNumber(number) {
    if(!creditcard.luhn(number)) {
      throw new Error('Invalid credit card number')
    }

  }

}

export default Card
