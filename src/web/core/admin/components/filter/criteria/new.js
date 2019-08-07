import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    filter: PropTypes.object,
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    criteria: PropTypes.object
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
            { name: 'criteria', type: 'hidden', defaultValue: criteria },
            { name: 'title', type: 'textfield', placeholder: 'Enter a title for this filter', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.filter.pop(1)
    this.context.modal.close()
  }

}

export default New
