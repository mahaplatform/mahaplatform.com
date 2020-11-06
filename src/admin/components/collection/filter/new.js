import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    criteria: PropTypes.array,
    onSuccess: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  state = {
    type: null
  }

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { code, criteria } = this.props
    return {
      title: 'New Filter',
      method: 'post',
      action: `/api/admin/${code}/filters`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', defaultValue: code },
            { name: 'config', type: 'hidden', defaultValue: { criteria } },
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title for this filter', required: true },
            { label: 'Share With', name: 'accesses', type: 'assignmentfield', prompt: 'Share filter with others' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.props.onSuccess(result)
    this.context.modal.close()
  }

}

export default New
