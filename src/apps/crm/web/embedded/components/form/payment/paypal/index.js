import { client, paypalCheckout } from 'braintree-web'
import paypal from 'paypal-checkout'
import PropTypes from 'prop-types'
import React from 'react'

class PayPal extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    onChoose: PropTypes.func,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {}
  }

  state = {
    selected: null
  }

  render() {
    return <div id="paypal-button" />
  }

  componentDidMount() {
    const { program, summary, token, onChoose, onSuccess } = this.props
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
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
          tagline: false,
          height: 40
        },
        commit: 'true',
        payment: () => {
          onChoose('paypal')
          return paypalCheckoutInstance.createPayment({
            flow: 'checkout',
            currency: 'USD',
            amount: summary.total,
            intent: 'capture',
            displayName: program.title,
            lineItems: summary.products.map(product => ({
              quantity: product.quantity,
              unitAmount: product.price,
              name: product.name
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
