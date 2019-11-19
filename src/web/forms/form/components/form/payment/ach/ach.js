import PropTypes from 'prop-types'
import React from 'react'

const mandate = 'By clicking "Pay", I authorize Braintree, a service of PayPal, on behalf of [your business name here] (i) to verify my bank account information using bank information and consumer reports and (ii) to debit my bank account.'

class ACH extends React.Component {

  static propTypes = {
    accountNumber: PropTypes.string,
    accountType: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    locality: PropTypes.string,
    ownershipType: PropTypes.string,
    payment: PropTypes.object,
    postalCode: PropTypes.string,
    region: PropTypes.string,
    routingNumber: PropTypes.string,
    streetAddress: PropTypes.string,
    token: PropTypes.string,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return (
      <div className="maha-payment-form">
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
        <div className="two fields">
          <div className="field">
            <label>Account Type</label>
            <input { ...this._getInput('AccountType', 'Account Type') } />
          </div>
          <div className="field">
            <label>Ownership Type</label>
            <input { ...this._getInput('ownershipType', 'Type') } />
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>First Name</label>
            <input { ...this._getInput('firstName', 'First Name') } />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input { ...this._getInput('lastName', 'Last Name') } />
          </div>
        </div>
        <div className="field">
          <label>Street</label>
          <input { ...this._getInput('streetAddress', 'Street') } />
        </div>
        <div className="three fields">
          <div className="field">
            <label>City</label>
            <input { ...this._getInput('locality', 'City') } />
          </div>
          <div className="field">
            <label>State</label>
            <input { ...this._getInput('region', 'State') } />
          </div>
          <div className="field">
            <label>Zip Code</label>
            <input { ...this._getInput('postalCode', 'Zip Code') } />
          </div>
        </div>
        <p className="maha-payment-mandate">{ mandate }</p>
        <button className="ui fluid blue button" onClick={ this._handleSubmit }>
          Submit Payment
        </button>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { payment, onSuccess } = this.props
    if(payment !== prevProps.payment) {
      onSuccess(payment)
    }
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
    const { accountNumber, routingNumber, token, ownershipType, accountType, firstName, lastName, streetAddress, locality, region, postalCode } = this.props
    const billingAddress = { streetAddress, locality, region, postalCode }
    const data = { accountNumber, routingNumber, ownershipType, accountType, firstName, lastName, billingAddress }
    this.props.onSubmit(token, data, mandate)
  }

  _handleUpdate(name, e) {
    this.props.onUpdate(name, e.target.value)
  }

}

export default ACH
