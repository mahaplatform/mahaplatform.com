import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    panel: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { panel } = this.props
    return {
      title: 'Edit Panel',
      method: 'patch',
      endpoint: `/api/admin/dashboard/panels/${panel.id}/edit`,
      action: `/api/admin/dashboard/panels/${panel.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter title', required: true },
            { label: 'Share With', name: 'accesses', type: 'assignmentfield', prompt: 'Share filter with others' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
