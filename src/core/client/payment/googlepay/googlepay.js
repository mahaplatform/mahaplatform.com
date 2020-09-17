import Dependencies from '../../dependencies'
import PropTypes from 'prop-types'
import React from 'react'

class GooglePay extends React.Component {

  static propTypes = {
    amount: PropTypes.number,
    data: PropTypes.object,
    endpoint: PropTypes.string,
    error: PropTypes.string,
    isProcessing: PropTypes.bool,
    lineItems: PropTypes.array,
    payment: PropTypes.object,
    paymentToken: PropTypes.string,
    status: PropTypes.string,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func
  }

  state = {
    error: null
  }

  _handleAuthorize = this._handleAuthorize.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { isProcessing } = this.props
    const { error } = this.state
    return (
      <div className="maha-payment-googlepay">
        <div className="googlepay-button">
          { !isProcessing &&
            <button className="gpay-button black short" onClick={ this._handleAuthorize } />
          }
          { isProcessing &&
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

  componentDidUpdate(prevProps, prevState) {
    const { error, status } = this.props
    if(error !== prevProps.error) {
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

  _handleAuthorize() {
    const { amount, paymentToken } = this.props
    this.props.onAuthorize(paymentToken, { amount })
  }

  _handleSubmit() {
    const { amount, data, endpoint, payment, token } = this.props
    const body = {
      ...data,
      payment: {
        amount,
        method: 'googlepay',
        payment
      }
    }
    this.props.onSubmit(endpoint, token, body)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

}

const dependencies = {
  scripts: [
    { url: 'https://pay.google.com/gp/p/js/pay.js', check: 'google.payments.api' }

  ]
}

GooglePay = Dependencies(dependencies)(GooglePay)

export default GooglePay
