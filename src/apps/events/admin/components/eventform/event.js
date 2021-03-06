import OrganizersField from '../organizersfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Event extends React.PureComponent {

  static propTypes = {
    event: PropTypes.object,
    mode: PropTypes.string,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { event, mode } = this.props
    return {
      title: 'Event Details',
      cancelIcon: mode === 'new' ? 'chevron-left' : null,
      cancelText: mode === 'edit' ? 'Cancel' : null,
      saveText: 'Next',
      onCancel: mode === 'new' ? this._handleBack : this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true, defaultValue: event.title },
            { label: 'URL', name: 'permalink', type: 'permalinkfield', prefix: '/events', placeholder: '/path/to/event', destination: `/events/${event.code}`, defaultValue: event.permalink },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Describe this event', defaultValue: event.description },
            { label: 'Image', name: 'image_id', type: 'attachmentfield', prompt: 'Choose an image', defaultValue: event.image_id },
            { label: 'Organizers', name: 'organizer_ids', type: OrganizersField, defaultValue: event.organizer_ids }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(event) {
    this.props.onChange(event)
  }

  _handleSuccess(event) {
    this.props.onDone(event)
  }

}

export default Event
