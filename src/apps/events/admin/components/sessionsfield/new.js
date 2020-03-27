import LocationToken from '../../tokens/location'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }
    state = {
      start_time: '0:00'
    }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { start_time } = this.state
    return {
      title: 'New Session',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter a title' },
            { label: 'Location', name: 'location', type: 'lookup', required: true, prompt: 'Choose a location', endpoint: '/api/admin/events/locations', text: 'name', form: this._getLocationForm(), format: LocationToken },
            { label: 'Date', name: 'date', type: 'datefield', required: true },
            { label: 'Time', type: 'segment', required: true, fields: [
              { type: 'fields', fields: [
                { name: 'start_time', placeholder: 'Enter start time', type: 'timefield', required: true },
                { name: 'end_time', placeholder: 'Enter end time', type: 'timefield', required: true, start: start_time, duration: true }
              ] }
            ] }
          ]
        }
      ]
    }
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
    this.props.onCancel()
  }

  _handleChangeField(key, value) {
    if(key !== 'start_time') return
    this.setState({
      start_time: value
    })
  }

  _handleSuccess(session) {
    this.props.onDone(session)
  }

}


export default New
