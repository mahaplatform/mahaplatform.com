import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Email extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    router: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Send Message',
      method: 'post',
      action: '/api/admin/team/users',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Subject', name: 'subject', type: 'textfield', required: true },
            { label: 'Body', name: 'body', type: 'textarea', required: true, rows: 10 }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/admin/team/users/${result.id}`)
    this.context.modal.close()
  }

}

export default Email
