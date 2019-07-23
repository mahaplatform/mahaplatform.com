import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
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
      title: 'New Responsibility',
      onSubmit: this._handleSubmit,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Responsibility', name: 'responsibility_type_id', type: 'radiogroup', endpoint: '/api/admin/appraisals/responsibility_types', value: 'id', text: 'text', required: true },
            { label: 'Weight', name: 'weight', type: 'numberfield', placeholder: 'Enter a number between 1 and 100', required: true }
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
