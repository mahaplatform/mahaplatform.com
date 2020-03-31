import TicketTypesField from '../../components/tickettypesfield'
import OrganizersField from '../../components/organizersfield'
import SessionsField from '../../components/sessionsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number,
    user: PropTypes.object,
    onBack: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { program_id } = this.props
    return {
      title: 'New Event',
      method: 'post',
      action: '/api/admin/events/events',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'program_id', type: 'hidden', defaultValue: program_id },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Describe this event'},
            { label: 'Image', name: 'image_id', type: 'attachmentfield', prompt: 'Choose an image' },
            { label: 'Sessions', name: 'sessions', type: SessionsField, required: true },
            { label: 'Ticket Types', name: 'ticket_types', type: TicketTypesField, required: true },
            { label: 'Organizers', name: 'organizer_ids', type: OrganizersField }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSuccess(event) {
    this.context.router.history.push(`/admin/events/events/${event.id}`)
    this.context.modal.close()
  }

}


export default New
