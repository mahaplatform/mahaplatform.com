import { Form } from 'maha-public'
import PropTypes from 'prop-types'
import React from 'react'

class ACH extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onBack: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleAuthorize = this._handleAuthorize.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Bank Account',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onSubmit: this._handleAuthorize,
      fields: [
        { label: 'Routing Number', name: 'routing_number', type: 'textfield' },
        { label: 'Account Number', name: 'account_number', type: 'textfield' }
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
