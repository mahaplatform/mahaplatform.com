import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    quiz: PropTypes.object,
    question: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { question, quiz } = this.props
    return {
      title: 'Edit Question',
      method: 'patch',
      endpoint: `/api/admin/learning/quiz/${quiz.id}/questions/${question.id}`,
      action: `/api/admin/learning/quiz/${quiz.id}/questions/${question.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Question', name: 'question', type: 'textarea', required: true },
            { label: 'Answers', name: 'answer', type: 'textfield', required: true },
            { label: 'Correct Answer', name: 'correct_answer', type: 'textfield', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.modal.close()
  }

}

export default Edit
