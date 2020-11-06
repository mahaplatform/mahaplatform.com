import React from 'react'
import PropTypes from 'prop-types'
import { Form } from '@admin'

class Edit extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Edit Resource',
      method: 'patch',
      endpoint: `/api/admin/learning/resources/${id}/edit`,
      action: `/api/admin/learning/resources/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Description', name: 'description', type: 'textfield', required: true },
            { label: 'URL', name: 'url', type: 'textfield' },
            { label: 'Attachment', name: 'asset_id', type: 'attachmentfield' }
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
