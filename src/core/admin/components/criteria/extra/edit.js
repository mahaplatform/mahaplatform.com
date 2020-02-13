import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    filter: PropTypes.object
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
    const { filter } = this.props
    return {
      title: 'Edit Filter',
      method: 'patch',
      endpoint: `/api/admin/${filter.code}/filters/${filter.id}/edit`,
      action: `/api/admin/${filter.code}/filters/${filter.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
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
    this.context.modal.close()
  }

}

export default Edit
