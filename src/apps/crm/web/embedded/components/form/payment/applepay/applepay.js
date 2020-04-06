import { client, applePay } from 'braintree-web'
import PropTypes from 'prop-types'
import React from 'react'

class ApplePay extends React.Component {

  static propTypes = {
    amount: PropTypes.number,
    error: PropTypes.string,
    form: PropTypes.object,
    isProcessing: PropTypes.bool,
    lineItems: PropTypes.array,
    program: PropTypes.object,
    status: PropTypes.string,
    token: PropTypes.string,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func
  }

  applePayInstance = null

  state = {
    error: null,
    ready: false
  }

  _handleAuthorize = this._handleAuthorize.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { isProcessing } = this.props
    const { error, ready }= this.state
    return (
      <div className="maha-payment-applepay">
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
        { error &&
          <div className="maha-payment-error">{ error }</div>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleInit()
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, status } = this.props
    if(error !== prevProps.error && error) {
      this.setState({ error })
    }
    if(status !== prevProps.status) {
      if(status === 'success') {
        this._handleSuccess()
      }
    }
  }

  _handleInit() {
    const { token } = this.props
    const onFailure = this._handleFailure.bind(this)
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
      this.setState({
        ready: true
      })
    }).catch((err) => {
      onFailure(err)
    })
  }

  _handleAuthorize() {
    const { amount, program } = this.props
    const onFailure = this._handleFailure.bind(this)
    const onSuccess = this._handleSubmit.bind(this)
    const paymentRequest = this.applePayInstance.createPaymentRequest({
      total: {
        label: program.title,
        amount
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
        onFailure(err)
        session.abort()
      })
    }
    session.onpaymentauthorized = (e) => {
      this.applePayInstance.tokenize({
        token: e.payment.token
      }).then(payload => {
        const { details, nonce } = payload
        const { paymentInstrumentName } = details
        const [ card_type, last_four ] = paymentInstrumentName.toLowerCase().split(' ')
        const reference = `${card_type}-${last_four}`
        onSuccess({ nonce, card_type, last_four, reference })
        session.completePayment(window.ApplePaySession.STATUS_SUCCESS)
      }).catch(err => {
        onFailure(err)
        session.completePayment(window.ApplePaySession.STATUS_FAILURE)
      })

    }
    session.begin()
  }

  _handleFailure(error) {
    this.setState({ error })
  }

  _handleSubmit(payment) {
    const { amount, form } = this.props
    const { token, code, data } = form
    const body = {
      ...data,
      payment: {
        amount,
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
