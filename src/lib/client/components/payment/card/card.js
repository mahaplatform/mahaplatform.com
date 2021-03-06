import creditcard from 'credit-card'
import { card } from 'creditcards'
import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.PureComponent {

  static propTypes = {
    amount: PropTypes.number,
    data: PropTypes.object,
    endpoint: PropTypes.string,
    error: PropTypes.string,
    isProcessing: PropTypes.bool,
    lineItems: PropTypes.array,
    payment: PropTypes.object,
    paymentToken: PropTypes.string,
    result: PropTypes.object,
    status: PropTypes.string,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdate: PropTypes.func,
    onValid: PropTypes.func
  }

  cvv = null
  expirationDate = null
  number = null

  state = {
    error: null,
    cvv: '',
    expirationDate: '',
    number: ''
  }

  _handleAuthorize = this._handleAuthorize.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleCVV = this._handleCVV.bind(this)
  _handleExpiration = this._handleExpiration.bind(this)
  _handleNumber = this._handleNumber.bind(this)
  _handleValidate = this._handleValidate.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { error, number, expirationDate, cvv } = this.state
    const { isProcessing } = this.props
    const icon = this._getIcon()
    return (
      <div className="maha-payment-card">
        <div className="maha-payment-label">Credit Card</div>
        <div className="maha-payment-form">
          <div className="maha-payment-card-field" tabIndex="1">
            <div className="maha-payment-card-input" tabIndex="1">
              <div className="maha-payment-card-icon">
                { icon ?
                  <img src={`/images/payments/${icon}.png`} /> :
                  <i className="fa fa-credit-card-alt" />
                }
              </div>
              <div className="maha-payment-card-number">
                <input { ...this._getNumber() } />
              </div>
              <div className="maha-payment-card-expiration">
                <input { ...this._getExpiration() } />
              </div>
              <div className="maha-payment-card-cvv">
                <input { ...this._getCVV() } />
              </div>
              { (number.length + expirationDate.length + cvv.length) > 0 ?
                <div className="maha-payment-card-clear" onClick={ this._handleClear }>
                  <i className="fa fa-times" />
                </div> :
                <div className="maha-payment-card-clear" />
              }
            </div>
          </div>
          { error &&
            <div className="maha-payment-error">{ error }</div>
          }
        </div>
        { isProcessing ?
          <button className="ui large fluid blue disabled button">
            <i className="fa fa-circle-o-notch fa-spin fa-fw" /> Processing
          </button> :
          <button className="ui large fluid blue button" onClick={ this._handleValidate }>
            Submit Payment
          </button>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, status } = this.props
    if(error !== prevProps.error && error) {
      this.setState({ error })
    }
    if(status !== prevProps.status) {
      if(status === 'authorized') {
        this._handleSubmit()
      }
      if(status === 'success') {
        this._handleSuccess()
      }
    }
  }

  _getCVV() {
    const { cvv } = this.state
    return {
      ref: node => this.cvv = node,
      type: 'tel',
      autoComplete: 'cc-cvv',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      spellCheck: 'off',
      placeholder: 'CVV',
      maxLength: 4,
      onChange: this._handleCVV,
      onKeyDown: this._handleKeyDown.bind(this, 'cvv'),
      value: cvv
    }
  }

  _getExpiration() {
    const { expirationDate } = this.state
    return {
      ref: node => this.expirationDate = node,
      type: 'tel',
      autoComplete: 'cc-exp',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      spellCheck: 'off',
      placeholder: 'MM/YY',
      maxLength: 5,
      onChange: this._handleExpiration,
      onKeyDown: this._handleKeyDown.bind(this, 'expirationDate'),
      value: this._getFormattedExpiration(expirationDate)
    }
  }

  _getFormattedExpiration(expirationDate) {
    const numbers = expirationDate.replace(/[^\d]/g, '')
    const month = numbers.substr(0,2)
    const year = numbers.substr(2,2)
    if(year.length > 0) return `${month}/${year}`
    return month
  }

  _getIcon() {
    const { number } = this.state
    const type = creditcard.determineCardType(number, { allowPartial: true })
    if(type === 'VISA') return 'visa'
    if(type === 'MASTERCARD') return 'mastercard'
    if(type === 'AMERICANEXPRESS') return 'amex'
    if(type === 'DISCOVER') return 'discover'
    if(type === 'JCB') return 'jcb'
    return null
  }

  _getNumber() {
    const { number } = this.state
    return {
      ref: node => this.number = node,
      type: 'tel',
      autoComplete: 'cc-number',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      spellCheck: 'off',
      placeholder: 'Card Number',
      maxLength: 22,
      onChange: this._handleNumber,
      value: card.format(number)
    }
  }

  _handleAuthorize() {
    const { number, expirationDate, cvv } = this.state
    const { paymentToken } = this.props
    this.props.onAuthorize(paymentToken, { number, expirationDate, cvv })
  }

  _handleClear() {
    this.setState({
      cvv: '',
      error: null,
      expirationDate: '',
      focused: null,
      number: ''
    })
  }

  _handleCVV(e) {
    const cvv = e.target.value
    this.setState({ cvv, error: null })
  }

  _handleExpiration(e) {
    const expirationDate = e.target.value
    this.setState({ expirationDate, error: null })
    if(expirationDate.match(/^\d{2}\/\d{2}$/)) {
      this.cvv.focus()
    }
  }

  _handleKeyDown(field, e) {
    if(e.which !== 8) return
    if(e.target.value.length > 1) return
    this.setState({ [field]: '' })
    const prev = field === 'cvv' ? 'expirationDate' : 'number'
    this[prev].focus()
  }

  _handleNumber(e) {
    const number = card.parse(e.target.value)
    this.setState({ number, error: null })
    if(number.length > 13 && card.isValid(number)) {
      this.expirationDate.focus()
    }
  }

  _handleSubmit() {
    const { amount, data, endpoint, payment, token } = this.props
    const body = {
      ...data,
      payment: {
        amount,
        method: 'card',
        payment
      }
    }
    this.props.onSubmit(endpoint, token, body)
  }

  _handleSuccess() {
    const { result } = this.props
    this.props.onSuccess(result)
  }

  _handleValidate() {
    const { onValid } = this.props
    const { number, expirationDate, cvv } = this.state
    if(!number) {
      return this.setState({ error: 'Card number is required' })
    } else if(!expirationDate) {
      return this.setState({ error: 'Expiration  is required' })
    } else if(!cvv) {
      return this.setState({ error: 'CVV  is required' })
    } else if(!creditcard.luhn(number)) {
      return this.setState({ error: 'Invalid credit card number' })
    }
    const type = creditcard.determineCardType(number)
    if(!creditcard.doesCvvMatchType(cvv, type)) {
      return this.setState({ error: 'Invalid CVV number for this card type' })
    } else if(!creditcard.doesCvvMatchType(cvv, type)) {
      return onValid(null, ['Invalid CVV number for this card type'])
    }
    const parts = expirationDate.match(/(\d{2})\/(\d{2})/)
    if(parts === null) {
      return this.setState({ error: 'Invalid date. Must be in the form MM/YY' })
    } else if(creditcard.isExpired(parts[1],`20${parts[2]}`)) {
      return this.setState({ error: 'This date is in the past' })
    }
    this._handleAuthorize()
  }

}

export default Card
