import { client, paypalCheckout } from 'braintree-web'
import paypal from 'paypal-checkout'
import PropTypes from 'prop-types'
import React from 'react'

class PayPal extends React.Component {

  static propTypes = {
    token: PropTypes.string
  }

  state = {
    selected: null
  }

  render() {
    return <div id="paypal-button" />
  }

  componentDidMount() {
    const { token } = this.props
    client.create({
      authorization: token
    }, function (err, clientInstance) {
      if(err) return err
      paypalCheckout.create({
        client: clientInstance
      }, function (err, paypalCheckoutInstance) {
        if(err) return err
        paypal.Button.render({
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
              console.log('payload', { email, nonce })
            })
          },
          onCancel: function (data) {
            console.log('cancelled', JSON.stringify(data, 0, 2))
          },
          onError: function (err) {
            console.error('checkout.js error', err)
          }
        }, '#paypal-button').then(function () {

        })
      })
    })
  }

}

export default PayPal
