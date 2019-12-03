import CardNumberField from '../cardnumberfield'
import { Button, Form } from 'maha-admin'
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
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    number: null
  }

  _handleAuthorize = this._handleAuthorize.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)

  render() {
    const { payment } = this.props
    return (
      <div className="finance-card">
        { payment ?
          <div className="finance-card-token">
            <img src={`/admin/images/payments/${this._getIcon()}.png`} />
            { payment.card_type.toUpperCase() }-{ payment.last_four }<br />
            Expires { payment.exp_month }/{ payment.exp_year }<br />
            <Button { ...this._getButton()} />
          </div> :
          <Form { ...this._getForm() } />
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onBusy(true)
    this.props.onFetch()
  }

  componentDidUpdate(prevProps) {
    const { payment, token } = this.props
    if(token !== prevProps.token) {
      this.props.onReady()
    }
    if(payment !== prevProps.payment) {
      this.props.onBusy(payment === null)
      this.props.onChange(payment)
    }
  }

  componentWillUnmount() {
    this.props.onBusy(false)
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
            ] },
            { type: 'submit', text: 'Authorize Card' }
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
  }

  _handleChangeField(key, value) {
    if(key === 'number') {
      this.setState({
        number: value
      })
    }
  }

  _handleClear() {
    this.props.onClear()
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
