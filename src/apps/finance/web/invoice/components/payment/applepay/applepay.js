import { ModalPanel } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

class ApplePay extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    payment: PropTypes.object,
    token: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onSubmit: PropTypes.func  }

  state = {
    amount: ''
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="finance-payment-applepay">
          <div className="finance-payment-applepay-body">
            <div className="ui form">
              <div className="field">
                <label>Amount</label>
                <input { ...this._getInput() } />
              </div>
            </div>
          </div>
          <div className="finance-payment-applepay-footer">
            <div className="apple-pay-button apple-pay-button-white" />
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
      title: 'ApplePay'
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


}

export default ApplePay
