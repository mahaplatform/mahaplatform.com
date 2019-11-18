import { client, googlePayment } from 'braintree-web'
import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.Component {

  static propTypes = {
    token: PropTypes.string,
    onSubmit: PropTypes.func
  }

  button = null
  payments = null
  googlePayment = null

  state = {
    ready: false
  }

  _handleCheck = this._handleCheck.bind(this)
  _handleFinalize = this._handleFinalize.bind(this)
  _handlePayment = this._handlePayment.bind(this)
  _handleSetup = this._handleSetup.bind(this)

  render() {
    const { ready } = this.state
    if(!ready) return null
    return (
      <div className="googlepay-button">
        <button className="gpay-button black short" onClick={ this._handlePayment } />
      </div>
    )
  }

  componentDidMount() {
    this._handleLoad()
  }

  componentDidUpdate(prevProps, prevState) {
    const { ready } = this.state
    if(ready !== prevState.ready) {
      this._handleSetup()
    }
  }

  _handleCheck() {
    const ready = typeof window !== 'undefined' && typeof window.google !== 'undefined'
    this.setState({ ready })
    if(!ready) setTimeout(this._handleCheck, 1000)
  }

  _handleLoad() {
    const ready = typeof window !== 'undefined' && typeof window.google !== 'undefined'
    if(ready) return this.setState({ ready })
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://pay.google.com/gp/p/js/pay.js'
    document.body.appendChild(script)
    setTimeout(this._handleCheck, 1000)
  }

  _handlePayment() {
    var paymentDataRequest = this.googlePayment.createPaymentDataRequest({
      transactionInfo: {
        currencyCode: 'USD',
        totalPriceStatus: 'FINAL',
        totalPrice: '100.00'
      }
    })
    var cardPaymentMethod = paymentDataRequest.allowedPaymentMethods[0]
    cardPaymentMethod.parameters.billingAddressRequired = true
    cardPaymentMethod.parameters.billingAddressParameters = {
      format: 'FULL',
      phoneNumberRequired: true
    }
    this.payments.loadPaymentData(paymentDataRequest).then(function(paymentData) {
      const { tokenizationData } = paymentData.paymentMethodData
      const token = JSON.parse(tokenizationData.token)
      const { details, nonce } = token.androidPayCards[0]
      console.log({
        nonce,
        card_type: details.cardType.toLowerCase(),
        last_four: details.lastFour
      })
    }).catch(function (err) {
      console.log(err)
      // Handle Google Pay errors
    })
  }

  _handleSetup() {
    const { token } = this.props
    const finalize = this._handleFinalize
    var paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: 'TEST'
    })
    client.create({
      authorization: token
    }, function (err, clientInstance) {
      if(err) return err
      googlePayment.create({
        client: clientInstance,
        googlePayVersion: 2
      }, function (err, googlePaymentInstance) {
        if(err) return err
        paymentsClient.isReadyToPay({
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods,
          existingPaymentMethodRequired: true
        }).then(function (isReadyToPay) {
          if(!isReadyToPay.result) return
          finalize(paymentsClient, googlePaymentInstance)
        })
      })
    })
  }

  _handleFinalize(payments, googlePayment) {
    this.payments = payments
    this.googlePayment = googlePayment
  }

}

export default Card
