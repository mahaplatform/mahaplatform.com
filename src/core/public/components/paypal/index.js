import { client, paypalCheckout } from 'braintree-web'
import paypal from 'paypal-checkout'
import PropTypes from 'prop-types'
import React from 'react'

class PayPal extends React.Component {

  static propTypes = {
    invoice: PropTypes.object,
    token: PropTypes.string,
    onSuccess: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    return <div className="paypal-button" id="paypal-button" />
  }

  componentDidMount() {
    const { invoice, token, onSuccess } = this.props
    client.create({
      authorization: token
    }).then(clientInstance => {
      return paypalCheckout.create({
        client: clientInstance
      })
    }).then(paypalCheckoutInstance => {
      return paypal.Button.render({
        env: 'sandbox',
        style: {
          color: 'black',
          shape: 'rect',
          label: 'paypal',
          tagline: false,
          height: 45
        },
        commit: 'true',
        payment: () => {
          return paypalCheckoutInstance.createPayment({
            flow: 'checkout',
            currency: 'USD',
            amount: invoice.balance,
            intent: 'capture',
            displayName: invoice.program.title,
            lineItems: invoice.line_items.map(line_item => ({
              quantity: line_item.quantity,
              unitAmount: line_item.price,
              name: line_item.description
            }))
          })
        },
        onAuthorize: (data, actions) => {
          return paypalCheckoutInstance.tokenizePayment(data, function (err, payload) {
            const { nonce, details } = payload
            const { email } = details
            onSuccess({ email, nonce })
          })
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

}

export default PayPal
