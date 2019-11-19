import PropTypes from 'prop-types'
import { methods } from './config'
import Summary from './summary'
import Methods from './methods'
import React from 'react'

import GooglePay from './googlepay'
import PayPal from './paypal'

class Payment extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    token: PropTypes.string,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  state = {
    selected: null
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { token } = this.props
    const { selected } = this.state
    if(!token) return null
    return (
      <div className="maha-payment">
        <Summary { ...this._getSummary() } />
        <div className="maha-payment-item">
          <div className="maha-payment-header">
            <strong>Payment Method</strong>
          </div>
          <Methods { ...this._getMethods() } />
          <div className="ui stackable two column grid">
            <div className="column">
              <GooglePay { ...this._getMethod('googlepay') } />
            </div>
            <div className="column">
              <PayPal { ...this._getMethod('paypal') } />
            </div>
          </div>
          <div className="maha-payment-form">
            { selected !== null && methods[selected].component &&
              <div className="ui form">
                { this._getComponent() }
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  componentDidUpdate(prevProps) {
    const { status, token, onReady } = this.props
    if(token !== prevProps.token && token) {
      // onReady()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
      if(status === 'finalizing') this._handleFinalize()
    }
  }

  _getComponent() {
    const { selected } = this.state
    const method = methods[selected]
    return method.component ? <method.component { ...this._getMethod(method.name) } /> : null
  }

  _getMethod(method) {
    const { token } = this.props
    return {
      token,
      onSuccess: this._handlePayment.bind(this, method)
    }
  }

  _getMethods(method) {
    const { selected } = this.state
    return {
      methods,
      selected,
      onChoose: this._handleChoose
    }
  }

  _getSummary() {
    return {
      products: [
        {
          tax: 0.08,
          code: 'ghijkl',
          name: '1 Flock (5 Ducks)',
          price: 5,
          quantity: 2,
          total: 10
        }
      ],
      subtotal: 10,
      total: 10,
      tax: 0
    }
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

  _handlePayment(method, payment) {
    console.log(method, payment)
  }

  // _handleFinalize() {
  //   this.props.onFinalize('paymentToken')
  // }
  //
  // _handleValidate() {
  //   console.log('validating payment field')
  //   this.props.onValidate('valid')
  // }

}

export default Payment
