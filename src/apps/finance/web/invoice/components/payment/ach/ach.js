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
  _handleAuthorize = this._handleAuthorize.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { invoice } = this.props
    return {
      title: 'Bank Account',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onSubmit: this._handleAuthorize,
      fields: [
        { label: 'Routing Number', name: 'routing_number', type: 'textfield' },
        { label: 'Account Number', name: 'account_number', type: 'textfield' },
        { label: 'Amount', name: 'amount', type: 'textfield', defaultValue: invoice.balance }
      ]
    }
  }

  _handleAuthorize() {
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default ACH
