import LocationToken from '../../tokens/location'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class New extends React.PureComponent {

  static propTypes = {
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    session: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { session } = this.state
    return {
      title: 'New Session',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
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
            { label: 'End Time', name: 'end_time', placeholder: 'Enter end time', type: 'timefield', required: true, start: session.start_time, duration: true }
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

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(session) {
    this.setState({ session })
  }

  _handleSuccess(session) {
    const date = moment(session.date).format('YYYY-MM-DD')
    this.props.onDone({
      ...session,
      starts_at: moment(`${date} ${session.start_time}`),
      ends_at: moment(`${date} ${session.end_time}`)
    })
  }

}


export default New
