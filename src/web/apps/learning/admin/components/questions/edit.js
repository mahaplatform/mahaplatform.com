import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import Answers from '../answers'
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
      endpoint: `/api/admin/learning/quizes/${quiz.id}/questions/${question.id}/edit`,
      action: `/api/admin/learning/quizes/${quiz.id}/questions/${question.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Question', name: 'text', type: 'textarea', required: true },
            { label: 'Answers', name: 'answers', type: Answers, required: true },
            { label: 'Explanation', name: 'explanation', type: 'textarea', required: true }
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
