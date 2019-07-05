import React from 'react'
import PropTypes from 'prop-types'
import { AttachmentField, Form } from 'maha-admin'

class Edit extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    offering: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { offering } = this.props
    return {
      title: 'Edit Offering',
      method: 'patch',
      endpoint: `/api/admin/learning/trainings/${offering.training.id}/offerings/${offering.id}/edit`,
      action: `/api/admin/learning/trainings/${offering.training.id}/offerings/${offering.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Date', name: 'date', type: 'datefield', required: true },
            { label: 'Start Time', name: 'starts_at', type: 'timefield', required: true },
            { label: 'End Time', name: 'ends_at', type: 'timefield', required: true },
            { label: 'Location', name: 'location', type: 'textfield' },
            { label: 'Facilitator', name: 'facilitator', type: 'textfield' },
            { label: 'Limit', name: 'limit', type: 'numberfield' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
