import React from 'react'
import PropTypes from 'prop-types'
import { AssigneeToken, Form } from 'maha-admin'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Assignment',
      method: 'post',
      action: '/api/admin/learning/assignments',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Training', name: 'training_id', type: 'lookup', prompt: 'Choose a training', endpoint: '/api/admin/learning/trainings', value: 'id', text: 'title' },
            { label: 'Assignees', name: 'assignments', type: 'lookup', prompt: 'Choose a user', endpoint: '/api/admin/assignees', value: 'id', text: 'title', format: AssigneeToken }
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
