import ProgramToken from '../../../tokens/program'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class Call extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    platform: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { contact } = this.props
    return {
      title: 'Call',
      method: 'post',
      action: `/api/admin/crm/contacts/${contact.id}/calls`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'date', type: 'datefield', defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Time', name: 'time', type: 'timefield', defaultValue: moment().format('hh:mm a') },
            { label: 'Program', name: 'program_id', type: 'lookup', endpoint: '/api/admin/crm/programs', value: 'id', text: 'title', required: true, format: ProgramToken },
            { label: 'Description', name: 'description', type: 'textarea', rows: 20, placeholder: 'Describe the call' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Call
