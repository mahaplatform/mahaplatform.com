import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    option: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { option } = this.props
    return {
      title: 'Edit Option',
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title', defaultValue: option.title },
            { label: 'Values', name: 'values', type: 'tagfield', required: true, placeholder: 'Separate values with a comma', defaultValue: option.values }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleSuccess(option) {
    this.props.onDone(option)
  }

}

export default Edit
