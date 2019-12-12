import { ModalPanel } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

class GooglePay extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    payment: PropTypes.object,
    token: PropTypes.string,
    onBack: PropTypes.func,
    onSubmit: PropTypes.func
  }

  state = {
    ready: false
  }

  _handleBack = this._handleBack.bind(this)
  _handleCheck = this._handleCheck.bind(this)
  _handlePayment = this._handlePayment.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-payment-googlepay">
          <div className="finance-payment-googlepay-body">
            GooglePay
          </div>
          <div className="finance-payment-googlepay-footer">
            <div className="gpay-button black short" onClick={ this._handlePayment } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleLoad()
  }

  componentDidUpdate(prevProps) {
    const { payment } = this.props
    if(!_.isEqual(payment, prevProps.payment)) {
      this.props.onDone(payment)
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
    const { invoice, token } = this.props
    this.props.onSubmit(token, invoice.total)
  }

}

export default GooglePay
