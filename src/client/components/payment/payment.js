import GooglePay from './googlepay'
import PropTypes from 'prop-types'
import ApplePay from './applepay'
import Methods from './methods'
import PayPal from './paypal'
import Card from './card'
import React from 'react'
import Door from './door'
import ACH from './ach'
import _ from 'lodash'

class Payment extends React.Component {

  static propTypes = {
    amount: PropTypes.number,
    data: PropTypes.object,
    endpoint: PropTypes.string,
    lineItems: PropTypes.object,
    method: PropTypes.string,
    program: PropTypes.object,
    settings: PropTypes.object,
    status: PropTypes.string,
    paymentToken: PropTypes.string,
    token: PropTypes.string,
    onFetch: PropTypes.func,
    onSetMethod: PropTypes.func,
    onSuccess: PropTypes.func
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { status, paymentToken } = this.props
    const methods = this._getAllowed()
    return (
      <div className="maha-payment">
        { status === 'loading' &&
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
        }
        { methods.length > 1 &&
          <Methods { ...this._getMethods() } />
        }
        { paymentToken &&
          <div className={`maha-payment-method ${ this.props.method }`}>
            { methods.map((method, index) => (
              <method.component { ...this._getMethod() } key={`method_${index}`} />
            ))}
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  _getAllowed() {
    const { settings } = this.props
    const methods = [
      { label: 'Credit Card', value: 'card', component: Card }
    ]
    if(settings.ach_enabled) {
      methods.push({ label: 'Bank Account', value: 'ach', component: ACH })
    }
    if(settings.googlepay_enabled) {
      methods.push({ label: 'Google Pay', value: 'googlepay', component: GooglePay })
    }
    if(settings.paypal_enabled) {
      methods.push({ label: 'Pay Pal', value: 'paypal', component: PayPal })
    }
    if(settings.applepay_enabled && window.ApplePaySession && window.ApplePaySession.supportsVersion(3) && window.ApplePaySession.canMakePayments()) {
      methods.push({ label: 'Apple Pay', value: 'applepay', component: ApplePay })
    }
    if(settings.door_enabled) {
      methods.push({ label: 'Pay at Door', value: 'door', component: Door })
    }
    return methods
  }

  _getForm() {
    const classes = ['ui','form']
    classes.push('loading')
    return classes.join(' ')
  }

  _getComponent() {
    const methods = this._getAllowed()
    const method = _.find(methods, { value: this.props.method })
    return method.component
  }

  _getMethods() {
    const { onSetMethod } = this.props
    return {
      methods: this._getAllowed(),
      onChoose: onSetMethod
    }
  }

  _getMethod(method) {
    const { amount, endpoint, data, lineItems, program, token, paymentToken } = this.props
    return {
      amount,
      endpoint,
      data,
      lineItems,
      program,
      paymentToken,
      token,
      onSuccess: this._handleSuccess
    }
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default Payment
