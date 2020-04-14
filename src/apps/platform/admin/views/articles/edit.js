import { AppToken, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    article: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { article } = this.props
    return {
      title: 'Edit Help Article',
      method: 'patch',
      endpoint: `/api/admin/platform/articles/${article.id}/edit`,
      action: `/api/admin/platform/articles/${article.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true },
            { label: 'App', name: 'app_id', type: 'lookup', prompt: 'Choose an app', endpoint: '/api/admin/platform/apps', value: 'id', text: 'title', required: true, format: AppToken },
            { label: 'Video', name: 'video_id', type: 'attachmentfield', prompt: 'Choose Video', multiple: false, allow: { extensions: ['mov','mp4'] } },
            { label: 'Body', name: 'body', type: 'textarea', placeholder: 'Enter body', required: true }
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
