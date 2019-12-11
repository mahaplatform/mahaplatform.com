import { client, applePay } from 'braintree-web'
import PropTypes from 'prop-types'
import React from 'react'

class ApplePay extends React.Component {

  static propTypes = {
    invoice: PropTypes.object,
    token: PropTypes.string,
    onChoose: PropTypes.func,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {},
    onSuccess: () => {}
  }

  applePayInstance = null;

  state = {
    ready: false
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    return <div className="apple-pay-button apple-pay-button-white" onClick={ this._handleClick } />
  }

  componentDidMount() {
    const { token } = this.props
    client.create({
      authorization: token
    }).then(clientInstance => {
      return applePay.create({
        client: clientInstance
      })
    }).then(instance => {
      this.applePayInstance = instance
      return window.ApplePaySession.canMakePaymentsWithActiveCard(instance.merchantIdentifier)
    }).then(canMakePaymentsWithActiveCard => {
      this.setState({ ready: true })
    }).catch((err) => {
      console.log(err)
    })
  }

  _handleClick() {
    const { invoice, onChoose } = this.props
    onChoose('applepay')
    if(!this.state.ready) return
    const paymentRequest = this.applePayInstance.createPaymentRequest({
      total: {
        label: invoice.program.title,
        amount: invoice.balance
      }
    })

    const session = new window.ApplePaySession(3, paymentRequest)

    session.onvalidatemerchant = (e) => {
      this.applePayInstance.performValidation({
        validationURL: e.validationURL,
        displayName: invoice.program.title
      }).then(merchantSession => {
        session.completeMerchantValidation(merchantSession)
      }).catch(err => {
        console.error('Error validating merchant:', err)
        session.abort()
      })
    }

    session.onpaymentauthorized = (e) => {
      console.log('Your shipping address is:', e.payment.shippingContact)

      this.applePayInstance.tokenize({
        token: e.payment.token
      }).then(payload => {
        console.log('nonce:', payload.nonce)

        console.log('billingPostalCode:', e.payment.billingContact.postalCode)

        session.completePayment(window.ApplePaySession.STATUS_SUCCESS)
      }).catch(err => {
        console.error('Error tokenizing Apple Pay:', err)
        session.completePayment(window.ApplePaySession.STATUS_FAILURE)
      })

    }

    session.begin()

  }

}

export default ApplePay
