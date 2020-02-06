import GooglePay from './googlepay'
import PropTypes from 'prop-types'
import ApplePay from './applepay'
import Summary from './summary'
import Methods from './methods'
import PayPal from './paypal'
import Card from './card'
import React from 'react'
import ACH from './ach'
import _ from 'lodash'

const methods = [
  { label: 'Credit Card', mark: 'card-mark.png', value: 'card', component: Card },
  { label: 'Bank Account', mark: 'ach-mark.png', value: 'ach', component: ACH }
]

if(process.env.GOOGLEPAY_ENABLED) {
  methods.push({ label: 'Google Pay', mark: 'googlepay-mark.png', value: 'googlepay', component: GooglePay })
}
if(process.env.PAYPAL_ENABLED) {
  methods.push({ label: 'Pay Pal', mark: 'paypal-mark.png', value: 'paypal', component: PayPal })
}
if(process.env.APPLEPAY_ENABLED && window.ApplePaySession && window.ApplePaySession.supportsVersion(3) && window.ApplePaySession.canMakePayments()) {
  methods.push({ label: 'Apple Pay', mark: 'applepay-mark.png', value: 'applepay', component: ApplePay })
}

class Payment extends React.Component {

  static propTypes = {
    form: PropTypes.object,
    method: PropTypes.string,
    program: PropTypes.object,
    status: PropTypes.string,
    summary: PropTypes.object,
    token: PropTypes.string,
    onFetch: PropTypes.func,
    onSetMethod: PropTypes.func,
    onSuccess: PropTypes.func
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { status } = this.props
    const Method = this._getComponent()
    return (
      <div className="maha-form-body">
        <div className="maha-payment">
          { status === 'loading' &&
            <div className="ui active inverted dimmer">
              <div className="ui large text loader">Loading</div>
            </div>
          }
          <Summary { ...this._getSummary() } />
          <Methods { ...this._getMethods() } />
          <Method { ...this._getMethod() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  _getForm() {
    const classes = ['ui','form']
    classes.push('loading')
    return classes.join(' ')
  }

  _getComponent() {
    const method = _.find(methods, { value: this.props.method })
    return method.component
  }

  _getMethods() {
    const { onSetMethod } = this.props
    return {
      methods,
      onChoose: onSetMethod
    }
  }

  _getMethod(method) {
    const { form, program, summary, token } = this.props
    return {
      form,
      program,
      summary,
      token,
      onSuccess: this._handleSuccess
    }
  }

  _getSummary() {
    return this.props.summary
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default Payment
