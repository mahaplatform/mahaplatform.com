import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Edit extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    training: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { training } = this.props
    return {
      title: 'Edit Training',
      method: 'patch',
      endpoint: `/api/admin/training/trainings/${training.id}/edit`,
      action: `/api/admin/training/trainings/${training.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Description', name: 'description', type: 'textarea', required: true },
            { label: 'Materials', name: 'asset_ids', type: 'attachmentfield', multiple: true }
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
