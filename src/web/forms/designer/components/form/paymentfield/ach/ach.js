import PropTypes from 'prop-types'
import React from 'react'

const mandate = 'By clicking ["Checkout"], I authorize Braintree, a service of PayPal, on behalf of [your business name here] (i) to verify my bank account information using bank information and consumer reports and (ii) to debit my bank account.'

class ACH extends React.Component {

  static propTypes = {
    accountNumber: PropTypes.string,
    routingNumber: PropTypes.string,
    token: PropTypes.string,
    onSubmit: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    return (
      <div className="maha-paymentfield-form">
        <div className="two fields">
          <div className="field">
            <label>Routing Number</label>
            <input { ...this._getInput('routingNumber', '123456789') } />
          </div>
          <div className="field">
            <label>Account Number</label>
            <input { ...this._getInput('accountNumber', '123456789') } />
          </div>
        </div>
        { mandate }
      </div>
    )
  }

  _getInput(name, placeholder) {
    return {
      type: 'text',
      placeholder,
      onChange: this._handleUpdate.bind(this, name),
      value: this.props[name]
    }
  }

  _handleSubmit() {
    const { accountNumber, routingNumber, token } = this.props
    const data = { accountNumber, routingNumber }
    this.props.onSubmit(token, data, mandate)
  }

  _handleUpdate(name, e) {
    this.props.onUpdate(name, e.target.value)
  }

}

export default ACH
