import LocationToken from '../../../tokens/location'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object,
    session: PropTypes.object
  }

  state = {
    session: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { event, session } = this.props
    return {
      title: 'Edit Session',
      method: 'patch',
      endpoint: `/api/admin/events/events/${event.id}/sessions/${session.id}/edit`,
      action: `/api/admin/events/events/${event.id}/sessions/${session.id}`,
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter a title' },
            this._getLocation(),
            { name: 'is_online', type: 'checkbox', prompt: 'This is an online session' },
            { label: 'Date', name: 'date', placeholder: 'Enter date', type: 'datefield', required: true },
            { label: 'Start Time', name: 'start_time', placeholder: 'Enter start time', type: 'timefield', required: true },
            { label: 'End Time', name: 'end_time', placeholder: 'Enter end time', type: 'timefield', required: true, start: session.start_time, duration: true, defaultValue: session.end_time }
          ]
        }
      ]
    }
  }

  _getLocation() {
    const { session } = this.state
    if(session.is_online) {
      return { label: 'Location', type: 'textfield', disabled: true, placeholder: 'This is an online event' }
    }
    return { label: 'Location', name: 'location', type: 'lookup', required: true, prompt: 'Choose a location', endpoint: '/api/admin/events/locations', text: 'name', form: this._getLocationForm(), format: LocationToken }
  }

  _getLocationForm() {
    return {
      title: 'New Location',
      method: 'post',
      action: '/api/admin/events/locations',
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Enter a name' },
            { label: 'Address', name: 'address', type: 'addressfield' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(session) {
    this.setState({ session })
  }

  _handleSuccess(session) {
    this.context.modal.close()
  }

}


export default Edit
