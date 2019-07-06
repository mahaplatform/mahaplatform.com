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
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Training', name: 'training_id', type: 'lookup', prompt: 'Choose a training', endpoint: '/api/admin/learning/trainings', value: 'id', text: 'title', required: true },
            { label: 'Assign To', name: 'assignments', type: 'assignmentfield', prompt: 'Choose a user', required: true },
            { label: 'Must Be Completed By', name: 'due', type: 'datefield' }
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
