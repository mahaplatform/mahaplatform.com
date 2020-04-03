import ContactFieldsField from '../../components/contactfieldsfield'
import TicketFieldsField from '../../components/ticketfieldsfield'
import TicketTypesField from '../../components/tickettypesfield'
import OrganizersField from '../../components/organizersfield'
import SessionsField from '../../components/sessionsfield'
import { connect } from 'react-redux'
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
    const { program_id, user } = this.props
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
            { label: 'Permalink', name: 'permalink', type: 'textfield', placeholder: '/your/event/name' },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Describe this event'},
            { label: 'Image', name: 'image_id', type: 'attachmentfield', prompt: 'Choose an image' },
            { label: 'Organizers', name: 'organizer_ids', type: OrganizersField },
            { label: 'Sessions', name: 'sessions', type: SessionsField, required: true },
            { label: 'Ticket Types', name: 'ticket_types', type: TicketTypesField, required: true },
            { label: 'Contact Fields', name: 'contactfields', type: ContactFieldsField },
            { label: 'Ticket Fields', name: 'ticketfields', type: TicketFieldsField },
            { label: 'Confirmation Email', type: 'segment', fields: [
              { label: 'Template', name: 'template_id', type: 'lookup', placeholder: 'Choose a template', endpoint: `/api/admin/crm/programs/${program_id}/templates`, value: 'id', text: 'title' },
              { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${program_id}/senders`, value: 'id', text: 'rfc822', required: true },
              { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: user.email },
              { label: 'Subject', name: 'subject', type: 'textfield', placeholder: 'Enter a subject', required: true, defaultValue: 'Thank you for filling out our form' }
            ] }
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

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(New)
