import React from 'react'
import PropTypes from 'prop-types'
import { CompactUserToken, Form } from 'maha-admin'

class Edit extends React.Component {

  static propTypes = {
    id: PropTypes.number,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Edit Conversation',
      method: 'patch',
      endpoint: `/api/admin/chat/channels/${id}/edit`,
      action: `/api/admin/chat/channels/${id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield' },
            { label: 'Description', name: 'description', type: 'textfield' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleSuccess(result) {
    this.props.onSuccess(result)
  }

}

export default Edit
