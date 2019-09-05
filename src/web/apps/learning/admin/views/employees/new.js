import React from 'react'
import PropTypes from 'prop-types'
import { Form, UserToken } from 'maha-admin'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    employee: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Create Plan',
      method: 'post',
      action: '/api/admin/learning/employees/plans',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Employee', name: 'employee_id', type: 'lookup', placeholder: 'Choose an employee', required: true, endpoint: '/api/admin/learning/employees', value: 'id', text: 'full_name', format: UserToken },
            { label: 'Due', name: 'due', type: 'datefield', required: true }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/admin/learning/plans/${result.id}`)
    this.context.modal.close()
  }

}

export default New
