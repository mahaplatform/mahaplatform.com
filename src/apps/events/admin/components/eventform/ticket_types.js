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
      title: 'Ticket Types',
      cancelIcon: 'chevron-left',
      saveText: 'Next',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'ticket_types', type: TicketTypesField, required: true, defaultValue: event.ticket_types }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange({ ticket_types }) {
    this.props.onChange({ ticket_types })
  }

  _handleSuccess({ ticket_types }) {
    this.props.onDone({ ticket_types })
  }

}

export default TicketTypes
