import { client, paypalCheckout } from 'braintree-web'
import { Form, ModalPanel } from 'maha-public'
import AmountField from '../amountfield'
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
    amount: 0.00,
    ready: false
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-payment-paypal">
          <div className="finance-payment-paypal-body">
            <Form { ...this._getForm() } />
          </div>
          <div className="finance-payment-paypal-footer">
            <div className="paypal-button" id="paypal-button" />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleInit()
  }

  _getForm() {
    const { invoice } = this.props
    return {
      inline: true,
      onChange: this._handleChange,
      fields: [
        { label: 'Amount', name: 'amount', type: AmountField, required: true, balance: invoice.balance }
      ]
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
          color: 'black',
          shape: 'rect',
          label: 'paypal',
          tagline: false,
          height: 40
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

  _handleChange({ amount }) {
    this.setState({ amount })
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
