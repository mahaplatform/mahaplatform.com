import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class EmployeePlanCreate extends React.Component {

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
    const { employee } = this.props
    return {
      title: 'Create Plan',
      method: 'post',
      action: `/api/admin/competencies/employees/${employee.id}/plans`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
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
    this.context.router.push(`/admin/competencies/employees/${result.employee_id}/plans/${result.id}`)
    this.context.modal.close()
  }

}

export default EmployeePlanCreate
