import ProjectToken from '../../tokens/project_token'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    projectEndpoint: PropTypes.string,
    trip: PropTypes.object
  }

  state = {
    time_leaving: '0:00'
  }

  _handleChangeField = this._handleChangeField.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { projectEndpoint, trip } = this.props
    return {
      title: 'Edit Mileage',
      method: 'patch',
      endpoint: `/api/admin/expenses/trips/${trip.id}/edit`,
      action: `/api/admin/expenses/trips/${trip.id}`,
      onChangeField: this._handleChangeField,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Description', name: 'description', type: 'textfield', required: true },
            { label: 'Project', name: 'project_id', type: 'lookup', endpoint: projectEndpoint, value: 'id', text: 'title', format: ProjectToken },
            { label: 'Time Leaving', name: 'time_leaving', type: 'timefield', placeholder: 'Time Leaving' },
            this._getTimeArriving(),
            { label: 'Odometer Start', name: 'odometer_start', type: 'textfield', placeholder: 'Odometer Start' },
            { label: 'Odometer End', name: 'odometer_end', type: 'textfield', placeholder: 'Odometer End' },
            { label: 'Distance', name: 'total_miles', type: 'textfield', placeholder: 'Total Miles' }
          ]
        }
      ]
    }
  }

  _getTimeArriving() {
    const { time_leaving } = this.state
    return { label: 'Time Arriving', name: 'time_arriving', type: 'timefield', start: time_leaving, duration: true }
  }

  _handleChangeField(key, value) {
    if(key !== 'time_leaving') return
    this.setState({ time_leaving: value })
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(trip) {
    this.context.modal.close()
  }

}

export default Edit
