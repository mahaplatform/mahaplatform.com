import LocationToken from '../../tokens/location'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    is_online: false
  }

  _handleBack = this._handleBack.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Session',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter a title' },
            this._getLocation(),
            { name: 'is_online', type: 'checkbox', prompt: 'This is an online session' },
            { label: 'Date', name: 'date', placeholder: 'Enter date', type: 'datefield', required: true },
            { label: 'Start Time', name: 'start_time', placeholder: 'Enter start time', type: 'timefield', required: true },
            { label: 'End Time', name: 'end_time', placeholder: 'Enter end time', type: 'timefield', required: true }
          ]
        }
      ]
    }
  }

  _getLocation() {
    const { is_online } = this.state
    if(is_online) {
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

  _handleChangeField(key, value) {
    if(key === 'is_online') {
      this.setState({
        is_online: value
      })
    }
  }

  _handleSuccess(session) {
    this.props.onDone(session)
  }

}


export default New
