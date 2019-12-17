import { Form } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

const types = [
  { value: 'personal checking', text: 'Personal Checking' },
  { value: 'personal savings', text: 'Personal Savings' },
  { value: 'business checking', text: 'Business Checking' },
  { value: 'business savings', text: 'Business Savings' }
]

class ACH extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    invoice: PropTypes.object,
    payment: PropTypes.object,
    token: PropTypes.string,
    onAuthorize: PropTypes.func,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onSubmit: PropTypes.func
  }

  mandate = ''

  state = {
    amount: 0.00,
    type: 'personal checking'
  }

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleAuthorize = this._handleAuthorize.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getMandate() {
    const { invoice } = this.props
    return `By submitting this form, I authorize Braintree, a service of PayPal, on behalf of ${ invoice.program.title } to verify my bank account information using bank information and consumer reports and to debit my bank account.`
  }

  _getForm() {
    const { invoice } = this.props
    const { type } = this.state
    return {
      title: 'Bank Account',
      cancelIcon: 'chevron-left',
      saveText: null,
      saveButton: 'Make Payment',
      onCancel: this._handleBack,
      onChangeField: this._handleChangeField,
      onSubmit: this._handleAuthorize,
      fields: [
        { label: 'Account Type', name: 'type', type: 'dropdown', required: true, options: types, defaultValue: type },
        ...this._getOwnershipFields(),
        { label: 'Address', name: 'billingAddress', type: 'textfield', required: true },
        { type: 'fields', fields: [
          { label: 'Routing Number', name: 'routingNumber', type: 'textfield', placeholder: 'XXXXXXXXX', required: true },
          { label: 'Account Number', name: 'accountNumber', type: 'textfield', required: true }
        ] },
        { label: 'Amount', name: 'amount', type: 'textfield', required: true, defaultValue: invoice.balance },
        { type: 'text', style: 'warning', text: this._getMandate()  }
      ]
    }
  }

  _getOwnershipFields() {
    const { type } = this.state
    if(type.match(/personal/)) {
      return [
        { type: 'fields', fields: [
          { label: 'First Name', name: 'firstName', type: 'textfield', required: true },
          { label: 'Last Name', name: 'lastName', type: 'textfield', required: true }
        ] }
      ]
    } else {
      return [
        { label: 'Business Name', name: 'businessName', type: 'textfield', required: true }
      ]
    }
  }

  _getTypes(type) {
    return {
      accountType: type.match(/checking/) ? 'checking' : 'savings',
      ownershipType: type.match(/personal/) ? 'personal' : 'business'
    }
  }

  _handleAuthorize(data) {
    const { token } = this.props
    const mandate = this._getMandate()
    const { amount, routingNumber, accountNumber, type, firstName, lastName, businessName, billingAddress } = data
    const { accountType, ownershipType } = this._getTypes(type)
    this.setState({ amount })
    const shared = { routingNumber, accountNumber, accountType, ownershipType, billingAddress }
    if(ownershipType === 'business') return this.props.onAuthorize(token, { ...shared, businessName })
    this.props.onAuthorize(token, { ...shared, firstName, lastName }, mandate)
  }

  _handleChangeField(key, value) {
    if(key === 'type') {
      this.setState({ type: value })
    }
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default ACH
