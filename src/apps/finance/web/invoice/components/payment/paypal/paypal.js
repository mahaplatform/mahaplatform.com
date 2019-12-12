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

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-payment-paypal">
          <div className="finance-payment-paypal-body">
            PayPal
          </div>
          <div className="finance-payment-paypal-footer">
            <div className="paypal-button" id="paypal-button" />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { invoice, token, onDone } = this.props
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
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          tagline: false,
          height: 45
        },
        commit: 'true',
        payment: () => {
          return paypalCheckoutInstance.createPayment({
            flow: 'vault',
            currency: 'USD',
            amount: invoice.balance,
            intent: 'capture',
            displayName: invoice.program.title
          })
        },
        onAuthorize: (data, actions) => {
          return paypalCheckoutInstance.tokenizePayment(data, function (err, payment) {
            onDone({
              amount: invoice.balance,
              method: 'paypal',
              payment
            })
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

}

export default PayPal
