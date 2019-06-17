import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class SecurityQuestion extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Change Security Question',
      method: 'patch',
      endpoint: '/api/admin/account',
      action: '/api/admin/account/security/question',
      cancelText: <i className="fa fa-chevron-left" />,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Question', name: 'security_question_id', type: 'lookup', endpoint: '/api/admin/security_questions', value: 'id', text: 'text', required: true },
            { label: 'Answer', name: 'security_question_answer', type: 'textfield', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.pop()
  }

  _handleSuccess(user) {
    this.context.modal.pop()
  }

}

export default SecurityQuestion
