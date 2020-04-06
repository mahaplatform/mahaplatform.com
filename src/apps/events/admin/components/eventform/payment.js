import TicketTypesField from '../tickettypesfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class TicketTypes extends React.PureComponent {

  static propTypes = {
    event: PropTypes.object,
    onBack: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { event } = this.props
    return {
      title: 'Payment',
      cancelIcon: 'chevron-left',
      saveText: 'Next',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Ticket Types', name: 'ticket_types', type: TicketTypesField, required: true, defaultValue: event.ticket_types },
            { label: 'Accepted Payment Methods', name: 'payment_methods', type: 'checkboxes', required: true, options: [
              { value: 'card', text: 'Credit Card' },
              { value: 'ach', text: 'ACH' },
              { value: 'paypal', text: 'PayPal' },
              { value: 'googlepay', text: 'GooglePay' },
              { value: 'applepay', text: 'ApplePay' },
              { value: 'door', text: 'Pay at door' }
            ], defaultValue: event.payment_methods || ['card','ach','paypal','googlepay','applepay','door'] }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange({ payment_methods, ticket_types }) {
    const payment_config = { payment_methods }
    this.props.onChange({ payment_config, ticket_types })
  }

  _handleSuccess({ payment_methods, ticket_types }) {
    const payment_config = { payment_methods }
    this.props.onDone({ payment_config, ticket_types })
  }

}

export default TicketTypes
