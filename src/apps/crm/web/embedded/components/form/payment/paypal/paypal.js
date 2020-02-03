import { client, paypalCheckout } from 'braintree-web'
import paypal from 'paypal-checkout'
import PropTypes from 'prop-types'
import React from 'react'

class PayPal extends React.Component {

  static propTypes = {
    form: PropTypes.object,
    isProcessing: PropTypes.bool,
    program: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {}
  }

  state = {
    selected: null
  }

  _handleInit = this._handleInit.bind(this)

  render() {
    const { isProcessing } = this.props
    return (
      <div className="paypal-button">
        { !isProcessing ?
          <div id="paypal-button" /> :
          <span>
            <i className="fa fa-circle-o-notch fa-spin fa-fw" /> Processing
          </span>
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
      if(status === 'authorized') {
        this._handleSubmit()
      }
      if(status === 'success') {
        this._handleSuccess()
      }
    }
  }

  _handleInit() {
    const { program, summary, token } = this.props
    const onFailure = this._handleFailure.bind(this)
    const onSuccess = this._handleSubmit.bind(this)
    client.create({
      authorization: token
    }).then(clientInstance => paypalCheckout.create({
      client: clientInstance
    })).then(paypalCheckoutInstance => {
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
        payment: () => paypalCheckoutInstance.createPayment({
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
        }),
        onAuthorize: (data, actions) => paypalCheckoutInstance.tokenizePayment(data, function (err, payload) {
          const { nonce, details } = payload
          const { email } = details
          onSuccess({ email, nonce })
        }),
        onError: err => {
          onFailure(err)
        }
      }, '#paypal-button')
    }).catch(err => {
      onFailure(err)
    })
  }

  _handleFailure(err) {
    console.log('error', err)
  }

  _handleSubmit(payment) {
    const { form, summary } = this.props
    const { token, code, data } = form
    const body = {
      ...data,
      payment: {
        amount: summary.total,
        method: 'paypal',
        payment
      }
    }
    this.props.onSubmit(token, code, body)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default PayPal
