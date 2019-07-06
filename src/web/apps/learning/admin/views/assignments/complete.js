import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class Complete extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    assignment: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { assignment } = this.props
    return {
      title: 'Complete Assignment',
      method: 'patch',
      action: `/api/admin/learning/assignments/${assignment.id}/complete`,
      successText: 'Complete',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Please provide any feedback (optional)', name: 'feedback', type: 'textarea', rows: 20 }
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

export default Complete
