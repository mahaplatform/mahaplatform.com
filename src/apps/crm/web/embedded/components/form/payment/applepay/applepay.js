import { client, applePay } from 'braintree-web'
import PropTypes from 'prop-types'
import React from 'react'

class ApplePay extends React.Component {

  static propTypes = {
    error: PropTypes.string,
    form: PropTypes.object,
    isProcessing: PropTypes.bool,
    payment: PropTypes.object,
    program: PropTypes.object,
    status: PropTypes.string,
    summary: PropTypes.object,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func
  }

  applePayInstance = null

  state = {
    ready: false
  }

  _handleAuthorize = this._handleAuthorize.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { isProcessing } = this.props
    const { ready }= this.state
    return (
      <div className="applepay-button">
        { !ready &&
          <span>
            <i className="fa fa-circle-o-notch fa-spin fa-fw" />
          </span>
        }
        { ready && !isProcessing &&
          <div className="apple-pay-button apple-pay-button-white" onClick={ this._handleAuthorize } />
        }
        { ready && isProcessing &&
          <span>
            <i className="fa fa-circle-o-notch fa-spin fa-fw" /> Processing
          </span>
        }
      </div>
    )
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

  _handleAuthorize() {
    const { program, summary } = this.props
    const paymentRequest = this.applePayInstance.createPaymentRequest({
      total: {
        label: program.title,
        amount: summary.total
      }
    })
    const session = new window.ApplePaySession(3, paymentRequest)
    session.onvalidatemerchant = (e) => {
      this.applePayInstance.performValidation({
        validationURL: e.validationURL,
        displayName: program.title
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

  _handleSubmit() {
    const { form, payment, summary } = this.props
    const { token, code, data } = form
    const body = {
      ...data,
      payment: {
        amount: summary.total,
        method: 'applepay',
        payment
      }
    }
    this.props.onSubmit(token, code, body)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default ApplePay
