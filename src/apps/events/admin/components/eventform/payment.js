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
            { prompt: 'Allow pay at door', name: 'pay_at_door', type: 'checkbox', required: true, defaultValue: event.pay_at_door }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange({ pay_at_door, ticket_types }) {
    const payment_config = { pay_at_door }
    this.props.onChange({ payment_config, ticket_types })
  }

  _handleSuccess({ pay_at_door, ticket_types }) {
    const payment_config = { pay_at_door }
    this.props.onDone({ payment_config, ticket_types })
  }

}

export default TicketTypes
