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
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onSubmit: PropTypes.func
  }

  state = {
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
    return {
      title: 'Bank Account',
      cancelIcon: 'chevron-left',
      saveText: null,
      saveButton: 'Make Payment',
      onCancel: this._handleBack,
      onChangeField: this._handleChangeField,
      onSubmit: this._handleAuthorize,
      fields: [
        { label: 'Routing Number', name: 'routing_number', type: 'textfield', placeholder: 'XXXXXXXXX', required: true },
        { label: 'Account Number', name: 'account_number', type: 'textfield', required: true },
        { label: 'Account Type', name: 'account_type', type: 'dropdown', required: true, options: ['checking','savings'], defaultValue: account_type },
        { label: 'Ownership Type', name: 'ownership_type', type: 'dropdown', required: true, options: ['personal','business'], defaultValue: ownership_type },
        ...this._getOwnershipFields(),
        { label: 'Address', name: 'address', type: 'textfield', required: true }
      ]
    }
  }

  _getOwnershipFields() {
    const { ownership_type } = this.state
    if(ownership_type === 'personal') {
      return [
        { label: 'First Name', name: 'first_name', type: 'textfield', required: true },
        { label: 'Last Name', name: 'last_name', type: 'textfield', required: true }
      ]
    } else {
      return [
        { label: 'Business Name', name: 'business_name', type: 'textfield', required: true }
      ]
    }
  }

  _handleAuthorize(data) {
    console.log('authorize ach', data)
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
