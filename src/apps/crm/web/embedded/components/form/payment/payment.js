import GooglePay from './googlepay'
import PropTypes from 'prop-types'
import ApplePay from './applepay'
import Summary from './summary'
import Methods from './methods'
import PayPal from './paypal'
import Card from './card'
import React from 'react'
import ACH from './ach'

class Payment extends React.Component {

  static propTypes = {
    method: PropTypes.string,
    program: PropTypes.object,
    summary: PropTypes.object,
    token: PropTypes.string,
    onFetch: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const Method = this._getComponent()
    return (
      <div className="maha-payment">
        <Summary { ...this._getSummary() } />
        <Methods { ...this._getMethods() } />
        <Method { ...this._getMethod() } />
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  _getComponent() {
    const { method } = this.props
    if(method === 'applepay') return ApplePay
    if(method === 'googlepay') return GooglePay
    if(method === 'paypal') return PayPal
    if(method === 'card') return Card
    if(method === 'ach') return ACH
  }

  _getMethods() {
    const { program, summary, token } = this.props
    return {
      program,
      token,
      summary,
      onSuccess: this._handleSuccess
    }
  }

  _getMethod(method) {
    const { program, summary, token } = this.props
    return {
      program,
      summary,
      token,
      onSuccess: this._handleSuccess
    }
  }

  _getSummary() {
    return this.props.summary
  }

  _handleSuccess(data) {
    const { method, summary } = this.props
    const amount = summary.total
    this.props.onSubmit(amount, method, data)
  }

}

export default Payment
