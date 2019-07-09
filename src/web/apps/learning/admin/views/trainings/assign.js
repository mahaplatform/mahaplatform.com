import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    training: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { training } = this.props
    return {
      title: 'Assign Trainings',
      method: 'post',
      action: `/api/admin/learning/trainings/${training.id}/assignments`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      saveText: 'Assign',
      sections: [
        {
          fields: [
            { label: 'Assign To', name: 'assignments', type: 'assignmentfield', prompt: 'Choose a user', required: true },
            { label: 'Must Be Completed By', name: 'completed_by', type: 'datefield' }
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
