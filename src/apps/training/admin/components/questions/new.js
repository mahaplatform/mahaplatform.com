import PropTypes from 'prop-types'
import { Form } from '@admin'
import Answers from './answers'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    onSubmit: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Question',
      onSubmit: this._handleSubmit,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Question', name: 'text', type: 'textarea', rows: 3, required: true },
            { label: 'Answers', name: 'answers', type: Answers, required: true },
            { label: 'Explanation', name: 'explanation', type: 'textarea', rows: 3, required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleSubmit(question) {
    this.props.onSubmit(question)
    return true
  }

  _handleSuccess(result) {
    this.context.form.pop()
  }

}

export default New
