import { client, paypalCheckout } from 'braintree-web'
import paypal from 'paypal-checkout'
import PropTypes from 'prop-types'
import React from 'react'

class PayPal extends React.Component {

  static propTypes = {
    amount: PropTypes.number,
    data: PropTypes.object,
    endpoint: PropTypes.string,
    error: PropTypes.object,
    isProcessing: PropTypes.bool,
    lineItems: PropTypes.array,
    paymentToken: PropTypes.string,
    program: PropTypes.object,
    status: PropTypes.string,
    token: PropTypes.string,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {}
  }

  state = {
    error: null,
    selected: null
  }

  _handleInit = this._handleInit.bind(this)

  render() {
    const { isProcessing } = this.props
    const { error } = this.state
    return (
      <div className="maha-payment-paypal">
        <div className="paypal-button">
          { !isProcessing ?
            <div id="paypal-button" /> :
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
    if(error !== prevProps.error) {
      this.setState({ error })
    }
    if(status !== prevProps.status) {
      if(status === 'success') {
        this._handleSuccess()
      }
    }
  }

  _handleInit() {
    const { amount, lineItems, program, paymentToken } = this.props
    const onFailure = this._handleFailure.bind(this)
    const onSuccess = this._handleSubmit.bind(this)
    client.create({
      authorization: paymentToken
    }).then(clientInstance => paypalCheckout.create({
      client: clientInstance
    })).then(paypalCheckoutInstance => {
      return paypal.Button.render({
        env: process.env.PAYPAL_ENVIRONMENT,
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
          amount: amount,
          intent: 'capture',
          displayName: program.title,
          lineItems: lineItems ? lineItems.map(line_item => ({
            description: line_item.name,
            quantity: line_item.quantity,
            unitAmount: line_item.price,
            name: line_item.name
          })) : []
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

  _handleFailure(error) {
    this.setState({ error })
  }

  _handleSubmit(payment) {
    const { amount, data, endpoint, token } = this.props
    const body = {
      ...data,
      payment: {
        amount,
        method: 'paypal',
        payment
      }
    }
    this.props.onSubmit(endpoint, token, body)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

export default PayPal
