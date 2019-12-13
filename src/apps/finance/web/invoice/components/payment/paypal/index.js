import { client, paypalCheckout } from 'braintree-web'
import { ModalPanel } from 'maha-public'
import paypal from 'paypal-checkout'
import PropTypes from 'prop-types'
import React from 'react'

class PayPal extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    payment: PropTypes.object,
    token: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    amount: '',
    ready: false
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-payment-paypal">
          <div className="finance-payment-paypal-body">
            <div className="ui form">
              <div className="field">
                <label>Amount</label>
                <input { ...this._getInput() } />
              </div>
            </div>
          </div>
          <div className="finance-payment-paypal-footer">
            <div className="paypal-button" id="paypal-button" />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { invoice } = this.props
    this.setState({
      amount: invoice.balance
    })
    this._handleInit()
  }

  _getInput() {
    const { amount } = this.state
    return {
      type: 'text',
      value: amount,
      onChange: this._handleChange
    }
  }

  _getPanel() {
    return {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      title: 'PayPal'
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleInit() {
    const { token } = this.props
    const done = this._handleDone.bind(this)
    client.create({
      authorization: token
    }).then(clientInstance => {
      return paypalCheckout.create({
        client: clientInstance
      })
    }).then(paypalCheckoutInstance => {
      const payment = this._handlePayment.bind(this, paypalCheckoutInstance)
      return paypal.Button.render({
        env: 'sandbox',
        style: {
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          tagline: false,
          height: 45
        },
        commit: 'true',
        payment,
        onAuthorize: (data, actions) => {
          return paypalCheckoutInstance.tokenizePayment(data, done)
        },
        onCancel: data => {
          console.log('cancelled', JSON.stringify(data, 0, 2))
        },
        onError: err => {
          console.error('checkout.js error', err)
        }
      }, '#paypal-button')
    }).catch(err => {
     console.error('Error!', err)
    })
  }

  _handleChange(e) {
    if(e.target.value.match(/^-?\d*\.?\d{0,2}$/) === null) return
    this.setState({
      amount: e.target.value
    })
  }

  _handleDone(err, payment) {
    const { amount } = this.state
    this.props.onDone({
      amount,
      method: 'paypal',
      payment: {
        email: payment.details.email,
        nonce: payment.nonce
      }
    })
  }

  _handlePayment(paypalCheckoutInstance) {
    const { amount } = this.state
    const { invoice } = this.props
    return paypalCheckoutInstance.createPayment({
      flow: 'checkout',
      currency: 'USD',
      amount,
      intent: 'capture',
      displayName: invoice.program.title
    })
  }

}

export default PayPal
