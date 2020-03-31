import TicketTypesField from '../../components/tickettypesfield'
import OrganizersField from '../../components/organizersfield'
import SessionsField from '../../components/sessionsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { event } = this.props
    return {
      title: 'New Event',
      method: 'patch',
      endpoint: `/api/admin/events/events/${event.id}/edit`,
      action: `/api/admin/events/events/${event.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
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

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(event) {
    this.context.modal.close()
  }

}


export default Edit
