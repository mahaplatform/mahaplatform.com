import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Option',
      cancelIcon: 'chevron-left',
      saveText: 'Done',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true, placeholder: 'Enter title' },
            { label: 'Values', name: 'values', type: 'tagfield', required: true, placeholder: 'Separate values with a comma' }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.context.modal.pop()
  }

  _handleSuccess(option) {
    this.props.onDone(option)
  }

}

export default New
