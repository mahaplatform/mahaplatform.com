import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Group',
      method: 'post',
      action: '/api/admin/news/groups',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Enter a title', required: true },
            { label: 'Logo', name: 'logo_id', type: 'attachmentfield', prompt: 'Choose Logo', multiple: false, allow: { extensions: ['jpg','jpeg','png','gif'] } },
            { label: 'Members', name: 'members', type: 'assignmentfield', prompt: 'Assign members' }
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

export default New
