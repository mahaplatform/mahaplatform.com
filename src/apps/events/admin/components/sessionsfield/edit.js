import LocationToken from '../../tokens/location'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class Edit extends React.PureComponent {

  static propTypes = {
    session: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    session: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.session) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    const { session } = this.props
    this.setState({ session })
  }

  _getForm() {
    const { session } = this.state
    return {
      title: 'Edit Session',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter a title', defaultValue: session.title },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Enter an optional description' },
            this._getLocation(),
            { name: 'is_online', type: 'checkbox', prompt: 'This is an online session', defaultValue: session.is_online },
            { label: 'Date', name: 'date', placeholder: 'Enter date', type: 'datefield', required: true, defaultValue: session.date },
            { label: 'Start Time', name: 'start_time', placeholder: 'Enter start time', type: 'timefield', required: true, defaultValue: session.start_time },
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
    return { label: 'Location', name: 'location', type: 'lookup', required: true, prompt: 'Choose a location', endpoint: '/api/admin/events/locations', text: 'name', form: this._getLocationForm(), format: LocationToken, defaultValue: session.location }
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

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(session) {
    this.setState({ session })
  }

  _handleSuccess(session) {
    const date = moment(session.date).format('YYYY-MM-DD')
    this.props.onDone({
      id: this.props.session.id,
      ...session,
      starts_at: moment(`${date} ${session.start_time}`),
      ends_at: moment(`${date} ${session.end_time}`)
    })
  }

}


export default Edit
