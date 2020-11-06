import React from 'react'
import PropTypes from 'prop-types'
import { Form } from '@admin'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { channel } = this.props
    return {
      title: 'Edit Conversation',
      method: 'patch',
      endpoint: `/api/admin/chat/channels/${channel.id}`,
      action: `/api/admin/chat/channels/${channel.id}`,
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
    this.context.modal.pop()
  }

  _handleSuccess(result) {
    this.context.modal.pop()
  }

}

export default Edit
