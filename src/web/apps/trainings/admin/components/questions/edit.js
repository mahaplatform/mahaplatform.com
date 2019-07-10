import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import Answers from './answers'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    question: PropTypes.array,
    onSubmit: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { question } = this.props
    return {
      title: 'Edit Question',
      onSubmit: this._handleSubmit,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      saveText: 'Done',
      sections: [
        {
          fields: [
            { label: 'Question', name: 'text', type: 'textarea', rows: 3, required: true, defaultValue: question.text },
            { label: 'Answers', name: 'answers', type: Answers, required: true, defaultValue: question.answers },
            { label: 'Explanation', name: 'explanation', type: 'textarea', rows: 3, required: true, defaultValue: question.explanation }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSubmit(question) {
    this.props.onSubmit({
      ...this.props.question,
      ...question
    })
    return true
  }

  _handleSuccess(result) {
    this.context.form.pop()
  }

}

export default Edit
