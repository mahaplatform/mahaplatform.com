import GooglePay from '../googlepay'
import ApplePay from '../applepay'
import PropTypes from 'prop-types'
import PayPal from '../paypal'
import Card from '../card'
import React from 'react'
import ACH from '../ach'

const components = {
  card: Card,
  ach: ACH
}

class Methods extends React.Component {

  static propTypes = {
    methods: PropTypes.array,
    program: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    selected: PropTypes.number,
    onChoose: PropTypes.func,
    onSuccess: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    const { selected } = this.state
    return (
      <div className="maha-payment-item">
        <div className="maha-payment-header">
          <strong>Payment Method</strong>
        </div>
        <div className="maha-payment-options">
          <div className="maha-payment-option">
            <div className="maha-payment-button card" onClick={ this._handleChoose.bind(this, 'card')}>
              Credit Card
            </div>
          </div>
          <div className="maha-payment-option">
            <div className="maha-payment-button ach" onClick={ this._handleChoose.bind(this, 'ach')}>
              Bank Account
            </div>
          </div>
          { window.ApplePaySession && window.ApplePaySession.supportsVersion(3) && window.ApplePaySession.canMakePayments() &&
            <div className="maha-payment-option">
              <ApplePay { ...this._getMethod('applepay') } />
            </div>
          }
          <div className="maha-payment-option">
            <GooglePay { ...this._getMethod('googlepay') } />
          </div>
          <div className="maha-payment-option">
            <PayPal { ...this._getMethod('paypal') } />
          </div>
        </div>
        { selected && components[selected] &&
          <div className="ui form">
            { this._getComponent() }
          </div>
        }
      </div>
    )
  }

  _getClass(index) {
    const { selected } = this.state
    const classes = ['maha-payment-method']
    if(index === selected) classes.push('selected')
    return classes.join(' ')
  }

  _getComponent() {
    const { selected } = this.state
    const Component = components[selected]
    return <Component { ...this._getMethod(selected) } />
  }

  _getMethod(method) {
    const { program, summary, token } = this.props
    return {
      program,
      summary,
      token,
      onChoose: this._handleChoose.bind(this, method),
      onSuccess: this._handleSuccess.bind(this, method)
    }
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

  _handleSuccess(method, data) {
    this.props.onSuccess(method, data)
  }

}

export default Methods
