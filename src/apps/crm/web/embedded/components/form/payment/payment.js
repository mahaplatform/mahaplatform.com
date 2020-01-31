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
    status: PropTypes.string,
    summary: PropTypes.object,
    token: PropTypes.string,
    onFetch: PropTypes.func,
    onSubmit: PropTypes.func
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { status } = this.props
    const Method = this._getComponent()
    return (
      <div className="maha-payment">
        { status === 'loading' &&
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
        }
        <Summary { ...this._getSummary() } />
        <Methods { ...this._getMethods() } />
        <Method { ...this._getMethod() } />
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  _getForm() {
    const classes = ['ui','form']
    classes.push('loading')
    return classes.join(' ')
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

  _handleSuccess(payment) {
    const { method, summary } = this.props
    const amount = summary.total
    this.props.onSubmit({ amount, method, payment })
  }

}

export default Payment
