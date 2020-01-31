import creditcard from 'credit-card'
import { card } from 'creditcards'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Card extends React.PureComponent {

  static propTypes = {
    payment: PropTypes.object,
    status: PropTypes.string,
    summary: PropTypes.object,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdate: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {},
    onValid: () => {}
  }

  cvv = null
  expirationDate = null
  number = null

  state = {
    focused: null,
    cvv: '',
    expirationDate: '',
    number: ''
  }

  _handleAuthorize = this._handleAuthorize.bind(this)
  _handleBlur = this._handleBlur.bind(this)
  _handleChange = _.debounce(this._handleChange.bind(this), 250, { trailing: true })
  _handleClear = this._handleClear.bind(this)
  _handleCVV = this._handleCVV.bind(this)
  _handleExpiration = this._handleExpiration.bind(this)
  _handleNumber = this._handleNumber.bind(this)
  _handleValidate = this._handleValidate.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { number, expirationDate, cvv } = this.state
    const { status } = this.props
    const icon = this._getIcon()
    return (
      <div className="maha-payment-item">
        <div className="maha-payment-label">Credit Card</div>
        <div className="maha-payment-form">
          <div className="finance-cardfield">
            <div className="finance-cardfield-icon">
              { icon ?
                <img src={`/admin/images/payments/${icon}.png`} /> :
                <i className="fa fa-credit-card-alt" />
              }
            </div>
            <div className="finance-cardfield-number">
              <input { ...this._getNumber() } />
            </div>
            <div className="finance-cardfield-expiration">
              <input { ...this._getExpiration() } />
            </div>
            <div className="finance-cardfield-cvv">
              <input { ...this._getCVV() } />
            </div>
            { (number.length + expirationDate.length + cvv.length) > 0 ?
              <div className="finance-cardfield-clear" onClick={ this._handleClear }>
                <i className="fa fa-times" />
              </div> :
              <div className="finance-cardfield-clear" />
            }
          </div>
          { status === 'loading' ?
            <button className="ui fluid blue disabled button">
              <i className="fa fa-circle-o-notch fa-spin fa-fw" /> Processing
            </button> :
            <button className="ui fluid blue button" onClick={ this._handleAuthorize }>
              Submit Payment
            </button>
          }
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { cvv, expirationDate, number } = this.state
    const { payment, token } = this.props
    if(token !== prevProps.token) {
      this.props.onReady(this._handleValidate)
    }
    if(payment !== prevProps.payment) {
      this._handleSuccess()
    }
    if(cvv !== prevState.cvv) {
      this.props.onChange(null)
    }
    if(expirationDate !== prevState.expirationDate) {
      this.props.onChange(null)
    }
    if(number !== prevState.number) {
      this.props.onChange(null)
    }
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
    const { focused, number } = this.state
    return {
      autoComplete: 'cc-number',
      ref: node => this.number = node,
      placeholder: focused === 'number' ? '' : 'Card Number',
      onBlur: this._handleBlur,
      onChange: this._handleNumber,
      onFocus: this._handleFocus.bind(this, 'number'),
      value: card.format(number)
    }
  }

  _getFormattedExpiration(expirationDate) {
    const numbers = expirationDate.replace(/[^\d]/g, '')
    const month = numbers.substr(0,2)
    const year = numbers.substr(2,2)
    if(year.length > 0) return `${month}/${year}`
    if(month.length === 2) return `${month}/`
    return month
  }

  _getExpiration() {
    const { expirationDate, focused } = this.state
    return {
      autoComplete: 'cc-exp',
      ref: node => this.expirationDate = node,
      placeholder: focused === 'expirationDate' ? '' : 'MM/YY',
      onBlur: this._handleBlur,
      onChange: this._handleExpiration,
      onFocus: this._handleFocus.bind(this, 'expirationDate'),
      value: this._getFormattedExpiration(expirationDate)
    }
  }

  _getCVV() {
    const { cvv, focused } = this.state
    return {
      autoComplete: 'cc-cvv',
      ref: node => this.cvv = node,
      placeholder: focused === 'cvv' ? '' : 'CVV',
      onBlur: this._handleBlur,
      onChange: this._handleCVV,
      onFocus: this._handleFocus.bind(this, 'cvv'),
      value: cvv
    }
  }

  _handleAuthorize() {
    const { number, expirationDate, cvv } = this.state
    const { token } = this.props
    this.props.onAuthorize(token, { number, expirationDate, cvv })
  }

  _handleChange() {
    const { cvv, expirationDate, number } = this.state
    this.props.onChange({ cvv, expirationDate, number })
  }

  _handleNumber(e) {
    const number = card.parse(e.target.value)
    this.setState({ number })
    if(card.isValid(number)) {
      this.expirationDate.focus()
    }
  }

  _handleExpiration(e) {
    const expirationDate = e.target.value
    this.setState({ expirationDate })
    if(expirationDate.match(/^\d{2}\/\d{2}$/)) {
      this.cvv.focus()
    }
  }

  _handleCVV(e) {
    this.setState({
      cvv: e.target.value
    })
  }

  _handleClear() {
    this.setState({
      cvv: '',
      expirationDate: '',
      focused: null,
      number: ''
    })
  }

  _handleBlur() {
    this.setState({
      focused: null
    })
  }

  _handleFocus(focused) {
    this.setState({
      focused
    })
  }

  _handleSuccess() {
    const { payment } = this.props
    this.props.onSuccess(payment)
  }

  _handleValidate() {
    const { onValid } = this.props
    const { number, expirationDate, cvv } = this.state
    if(!number) return onValid(null, ['Card number is required'])
    if(!expirationDate) return onValid(null, ['Expiration  is required'])
    if(!cvv) return onValid(null, ['CVV is required'])
    if(!creditcard.luhn(number)) {
      return onValid(null, ['Invalid credit card number'])
    }
    const type = creditcard.determineCardType(number)
    if(!creditcard.doesCvvMatchType(cvv, type)) {
      return onValid(null, ['Invalid CVV number for this card type'])
    }
    const parts = expirationDate.match(/(\d{2})\/(\d{2})/)
    if(parts === null) {
      return onValid(null, ['Invalid date. Must be in the format MM/YY'])
    } else if(creditcard.isExpired(parts[1],`20${parts[2]}`)) {
      return onValid(null, ['This date is in the past'])
    }
    onValid({ number, expirationDate, cvv })
  }

}

export default Card
