import { client, paypalCheckout } from 'braintree-web'
import paypal from 'paypal-checkout'
import PropTypes from 'prop-types'
import React from 'react'

class PayPal extends React.Component {

  static propTypes = {
    token: PropTypes.string,
    onSuccess: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    return <div id="paypal-button" />
  }

  componentDidMount() {
    const { token, onSuccess } = this.props
    client.create({
      authorization: token
    }).then(function(clientInstance) {
      return paypalCheckout.create({
        client: clientInstance
      })
    }).then(function(paypalCheckoutInstance) {
      return paypal.Button.render({
        env: 'sandbox',
        style: {
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
          tagline: false,
          height: 40
        },
        payment: function () {
          return paypalCheckoutInstance.createPayment({
            flow: 'checkout',
            currency: 'USD',
            amount: '10.00',
            intent: 'capture'
          })
        },
        onAuthorize: function (data, actions) {
          return paypalCheckoutInstance.tokenizePayment(data, function (err, payload) {
            const { nonce, details } = payload
            const { email } = details
            onSuccess({ email, nonce })
          })
        },
        onCancel: function (data) {
          console.log('cancelled', JSON.stringify(data, 0, 2))
        },
        onError: function (err) {
          console.error('checkout.js error', err)
        }
      }, '#paypal-button')
    }).catch(function (err) {
     console.error('Error!', err)
    })
  }

}

export default PayPal
