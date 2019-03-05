import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'

class EmployeePlanEdit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    plan: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { plan } = this.props
    return {
      title: 'Edit Plan',
      method: 'patch',
      endpoint: `/api/admin/competencies/employees/${plan.employee_id}/plans/${plan.id}`,
      action: `/api/admin/competencies/employees/${plan.employee_id}/plans/${plan.id}`,
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

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default EmployeePlanEdit
