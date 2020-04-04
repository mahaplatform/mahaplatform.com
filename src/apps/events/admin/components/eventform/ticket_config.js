import TicketFieldsField from '../ticketfieldsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class TicketFields extends React.PureComponent {

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
      title: 'Ticket Fields',
      cancelIcon: 'chevron-left',
      saveText: 'Next',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'ticket_config', type: TicketFieldsField, defaultValue: event.ticket_config }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange({ ticket_config }) {
    this.props.onChange({ ticket_config })
  }

  _handleSuccess({ ticket_config }) {
    this.props.onDone({ ticket_config })
  }

}

export default TicketFields
