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

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleAuthorize = this._handleAuthorize.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Bank Account',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChangeField: this._handleChangeField,
      onSubmit: this._handleAuthorize,
      buttons: [
        {
          label: 'Make Payment',
          color: 'red',
          handler: () => { console.log('foo') }
        }
      ],
      fields: [
        { label: 'Routing Number', name: 'routing_number', type: 'textfield', placeholder: 'XXXXXXXXX' },
        { label: 'Account Number', name: 'account_number', type: 'textfield' },
        { label: 'Account Type', name: 'account_type', type: 'dropdown', options: ['checking','savings'] },
        { label: 'Ownership Type', name: 'ownership_type', type: 'dropdown', options: ['personal','business'] },
        { label: 'Account Number', name: 'account_number', type: 'textfield' },
        { label: 'First Name', name: 'first_name', type: 'textfield' },
        { label: 'Last Name', name: 'last_name', type: 'textfield' },
        { label: 'Business Name', name: 'business_name', type: 'textfield' },
        { label: 'Address', name: 'address', type: 'addressfield' }
      ]
    }
  }

  _handleAuthorize() {
  }

  _handleChangeField(key, value) {
    console.log(key, value)
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default ACH
