import { AppToken, Form } from '@admin'
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
            { label: 'App', name: 'app_id', type: 'lookup', prompt: 'Choose an app', endpoint: '/api/admin/platform/apps', value: 'id', text: 'title', format: AppToken },
            { label: 'Desktop (1024x768)', name: 'desktop_id', type: 'attachmentfield', prompt: 'Choose Video', multiple: false, allow: { extensions: ['mov','mp4'] } },
            { label: 'Desktop Small (644x483)', name: 'desktop_small_id', type: 'attachmentfield', prompt: 'Choose Video', multiple: false, allow: { extensions: ['mov','mp4'] } },
            { label: 'Mobile (279x483)', name: 'mobile_id', type: 'attachmentfield', prompt: 'Choose Video', multiple: false, allow: { extensions: ['mov','mp4'] } },
            { label: 'Body', name: 'body', type: 'codefield', placeholder: 'Enter body', required: true }
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
