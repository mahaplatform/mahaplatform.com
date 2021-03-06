import ProjectToken from '../../tokens/project'
import PropTypes from 'prop-types'
import { Form } from '@admin'
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
      endpoint: `/api/admin/finance/trips/${trip.id}/edit`,
      action: `/api/admin/finance/trips/${trip.id}`,
      onChangeField: this._handleChangeField,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date of Trip', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Description', name: 'description', type: 'textfield', placeholder: 'Describe the trip', required: true },
            { label: 'Project', name: 'project_id', type: 'lookup', prompt: 'Choose a project', endpoint: projectEndpoint, value: 'id', text: 'display', format: ProjectToken },
            { label: 'Time Leaving', name: 'time_leaving', type: 'timefield', placeholder: 'Enter time leaving' },
            { label: 'Time Arriving', name: 'time_arriving', type: 'timefield', placeholder: 'Enter time arriving' },
            { label: 'Odometer Start', name: 'odometer_start', type: 'textfield', placeholder: 'Enter the odometer start' },
            { label: 'Odometer End', name: 'odometer_end', type: 'textfield', placeholder: 'Enter the odometer end' },
            { label: 'Distance', name: 'total_miles', type: 'textfield', placeholder: 'Enter the total miles' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(trip) {
    this.context.modal.close()
  }

}

export default Edit
