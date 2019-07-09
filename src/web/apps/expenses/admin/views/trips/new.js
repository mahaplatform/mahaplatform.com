import ProjectToken from '../../tokens/project_token'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class New extends React.Component {

  state = {
    time_leaving: '0:00'
  }

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    parent: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Mileage',
      method: 'post',
      action: '/api/admin/expenses/trips',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Description', name: 'description', type: 'textfield', required: true },
            { label: 'Project', name: 'project_id', type: 'lookup', prompt: 'Choose a project', endpoint: '/api/admin/expenses/memberships', value: 'id', text: 'title', format: ProjectToken },
            { label: 'Time Leaving', name: 'time_leaving', type: 'timefield' },
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
    const { modal } = this.context
    modal.close()
  }

}

export default New
