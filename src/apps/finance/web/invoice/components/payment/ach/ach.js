import { Form } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

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

  state = {
    amount: 0.00,
    account_type: 'checking',
    ownership_type: 'personal'
  }

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleAuthorize = this._handleAuthorize.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { account_type, ownership_type } = this.state
    const { invoice } = this.props
    return {
      title: 'Bank Account',
      cancelIcon: 'chevron-left',
      saveText: null,
      saveButton: 'Make Payment',
      onCancel: this._handleBack,
      onChangeField: this._handleChangeField,
      onSubmit: this._handleAuthorize,
      fields: [
        { label: 'Routing Number', name: 'routingNumber', type: 'textfield', placeholder: 'XXXXXXXXX', required: true },
        { label: 'Account Number', name: 'accountNumber', type: 'textfield', required: true },
        { label: 'Account Type', name: 'accountType', type: 'dropdown', required: true, options: ['checking','savings'], defaultValue: account_type },
        { label: 'Ownership Type', name: 'ownershipType', type: 'dropdown', required: true, options: ['personal','business'], defaultValue: ownership_type },
        ...this._getOwnershipFields(),
        { label: 'Address', name: 'billingAddress', type: 'textfield', required: true },
        { label: 'Amount', name: 'amount', type: 'textfield', required: true, defaultValue: invoice.balance }
      ]
    }
  }

  _getOwnershipFields() {
    const { ownership_type } = this.state
    if(ownership_type === 'personal') {
      return [
        { label: 'First Name', name: 'firstName', type: 'textfield', required: true },
        { label: 'Last Name', name: 'lastName', type: 'textfield', required: true }
      ]
    } else {
      return [
        { label: 'Business Name', name: 'businessName', type: 'textfield', required: true }
      ]
    }
  }

  _handleAuthorize(data) {
    const { token } = this.props
    const { amount, routingNumber, accountNumber, accountType, ownershipType, firstName, lastName, businessName, billingAddress } = data
    this.setState({ amount })
    const shared = { routingNumber, accountNumber, accountType, ownershipType, billingAddress }
    if(accountType === 'business') return this.props.onAuthorize(token, { ...shared, businessName })
    this.props.onAuthorize(token, { ...shared, firstName, lastName })
  }

  _handleChangeField(key, value) {
    if(key === 'account_type') {
      this.setState({ account_type: value })
    }
    if(key === 'ownership_type') {
      this.setState({ ownership_type: value })
    }
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default ACH
