import { AppToken, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Help Article',
      method: 'post',
      action: '/api/admin/platform/articles',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true },
            { label: 'App', name: 'app_id', type: 'lookup', prompt: 'Choose an app', endpoint: '/api/admin/platform/apps', value: 'id', text: 'title', format: AppToken },
            { label: 'Videos', type: 'segment', fields: [
              { label: 'Desktop (1024x768)', name: 'desktop_id', type: 'attachmentfield', prompt: 'Choose Video', multiple: false, allow: { extensions: ['mov','mp4'] } },
              { label: 'Desktop (644x483)', name: 'desktop_small_id', type: 'attachmentfield', prompt: 'Choose Video', multiple: false, allow: { extensions: ['mov','mp4'] } },
              { label: 'Mobile (279x483)', name: 'mobile_id', type: 'attachmentfield', prompt: 'Choose Video', multiple: false, allow: { extensions: ['mov','mp4'] } }
            ] },
            { label: 'Body', name: 'body', type: 'codefield', placeholder: 'Enter body', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(article) {
    this.context.router.history.push(`/admin/platform/help/articles/${article.id}`)
    this.context.modal.close()
  }

}

export default New
