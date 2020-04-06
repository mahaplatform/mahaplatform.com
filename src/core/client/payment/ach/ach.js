import { AddressField, DropDown, TextField } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class ACH extends React.Component {

  static propTypes = {
    accountNumber: PropTypes.string,
    accountType: PropTypes.string,
    amount: PropTypes.number,
    address: PropTypes.object,
    data: PropTypes.object,
    endpoint: PropTypes.string,
    error: PropTypes.string,
    firstName: PropTypes.string,
    isProcessing: PropTypes.bool,
    lastName: PropTypes.string,
    lineItems: PropTypes.array,
    locality: PropTypes.string,
    ownershipType: PropTypes.string,
    payment: PropTypes.object,
    paymentToken: PropTypes.string,
    postalCode: PropTypes.string,
    program: PropTypes.object,
    region: PropTypes.string,
    routingNumber: PropTypes.string,
    status: PropTypes.string,
    streetAddress: PropTypes.string,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAuthorize = this._handleAuthorize.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    const { error, isProcessing } = this.props
    return (
      <div className="maha-payment-ach">
        <div className="maha-payment-label">Bank Account</div>
        <div className="maha-payment-form">
          <div className="ui form">
            <div className="two fields">
              <div className="field">
                <label>Routing Number</label>
                <TextField { ...this._getInput('routingNumber', 'Enter routing number', 1) } />
              </div>
              <div className="field">
                <label>Account Number</label>
                <TextField { ...this._getInput('accountNumber', 'Enter account number', 2) } />
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>Account Type</label>
                <DropDown { ...this._getAccountType() } />
              </div>
              <div className="field">
                <label>Ownership Type</label>
                <DropDown { ...this._getOwnershipType() } />
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>First Name</label>
                <TextField { ...this._getInput('firstName', 'Enter first name', 5) } />
              </div>
              <div className="field">
                <label>Last Name</label>
                <TextField { ...this._getInput('lastName', 'Enter last name', 6) } />
              </div>
            </div>
            <div className="field">
              <label>Address</label>
              <AddressField { ...this._getAddressField() }/>
            </div>
          </div>
        </div>
        { error &&
          <div className="maha-payment-error">{ error }</div>
        }
        <p className="maha-payment-mandate">
          { this._getMandate() }
        </p>
        { isProcessing ?
          <button className="ui large fluid blue disabled button">
            <i className="fa fa-circle-o-notch fa-spin fa-fw" /> Processing
          </button> :
          <button className="ui large fluid blue button" onClick={ this._handleAuthorize }>
            Submit Payment
          </button>
        }
      </div>
    )
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

  _getMandate() {
    const { program } = this.props
    return `
      By clicking "Submit Payment", I authorize Braintree, a service of PayPal, on behalf
      of ${program.title} (i) to verify my bank account information using bank
      information and consumer reports and (ii) to debit my bank account.
    `
  }

  _getAccountType() {
    return {
      options: [
        { value: 'checking', text: 'Checking' },
        { value: 'savings', text: 'Savings' }
      ],
      placeholder: 'Choose a type',
      tabIndex: 3,
      onChange: this._handleUpdate.bind(this, 'accountType')
    }
  }

  _getAddressField() {
    return {
      placeholder: 'Enter address',
      tabIndex: 6,
      onChange: this._handleUpdate.bind(this, 'address')
    }
  }

  _getOwnershipType() {
    return {
      options: [
        { value: 'personal', text: 'Personal' },
        { value: 'business', text: 'Business' }
      ],
      placeholder: 'Choose a type',
      tabIndex: 4,
      onChange: this._handleUpdate.bind(this, 'ownershipType')
    }
  }

  _getInput(name, placeholder, tabIndex) {
    return {
      placeholder,
      tabIndex,
      value: this.props[name],
      onChange: this._handleUpdate.bind(this, name)
    }
  }

  _handleAuthorize() {
    const { accountNumber, routingNumber, ownershipType, paymentToken, accountType, firstName, lastName, address } = this.props
    const billingAddress = {
      streetAddress: address.street_1,
      locality: address.city,
      region: address.state_province,
      postalCode: address.postal_code
    }
    const data = { accountNumber, routingNumber, ownershipType, accountType, firstName, lastName, billingAddress }
    const mandate = this._getMandate()
    this.props.onAuthorize(paymentToken, data, mandate)
  }

  _handleSubmit() {
    const { amount, data, endpoint, payment, token } = this.props
    const body = {
      ...data,
      payment: {
        amount,
        method: 'ach',
        payment
      }
    }
    this.props.onSubmit(endpoint, token, body)
  }

  _handleSuccess() {
    this.props.onSuccess()
  }

  _handleUpdate(name, value) {
    this.props.onUpdate(name, value)
  }

}

export default ACH
