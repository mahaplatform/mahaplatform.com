import { ModalPanel } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class GooglePay extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    payment: PropTypes.object,
    token: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onSubmit: PropTypes.func
  }

  state = {
    amount: '',
    ready: false
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleCheck = this._handleCheck.bind(this)
  _handlePayment = this._handlePayment.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-payment-googlepay">
          <div className="finance-payment-googlepay-body">
            <div className="ui form">
              <div className="field">
                <label>Amount</label>
                <input { ...this._getInput() } />
              </div>
            </div>
          </div>
          <div className="finance-payment-googlepay-footer">
            <div className="gpay-button black short" onClick={ this._handlePayment } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { invoice } = this.props
    this.setState({
      amount: invoice.balance
    })
    this._handleLoad()
  }

  componentDidUpdate(prevProps) {
    const { payment } = this.props
    const { amount } = this.state
    if(!_.isEqual(payment, prevProps.payment)) {
      this.props.onDone({
        amount,
        method: 'googlepay',
        payment
      })
    }
  }

  _getInput() {
    const { amount } = this.state
    return {
      type: 'text',
      value: amount,
      onChange: this._handleChange
    }
  }

  _getPanel() {
    return {
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      title: 'GooglePay'
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(e) {
    if(e.target.value.match(/^-?\d*\.?\d{0,2}$/) === null) return
    this.setState({
      amount: e.target.value
    })
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
    const { amount } = this.state
    const { token } = this.props
    this.props.onSubmit(token, amount)
  }

}

export default GooglePay
