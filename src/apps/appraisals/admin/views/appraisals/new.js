import PropTypes from 'prop-types'
import { UserToken, Form } from 'maha-admin'
import React from 'react'

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
      title: 'Create Appraisal',
      method: 'post',
      action: '/api/admin/appraisals/appraisals',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Employee', name: 'employee_id', type: 'lookup', placeholder: 'Choose an employee', required: true, endpoint: '/api/admin/users/employees', value: 'id', text: 'full_name', format: UserToken }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/appraisals/appraisals/${result.id}`)
    this.context.modal.close()
  }

}

export default New
