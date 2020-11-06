import { Form } from '@admin'
import NotifiyMe from './notify_me'
import PropTypes from 'prop-types'
import React from 'react'

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
      endpoint: `/api/admin/learning/plans/${plan.id}/edit`,
      action: `/api/admin/learning/plans/${plan.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Due', name: 'due', type: 'datefield', required: true },
            { label: 'Send me a reminder', name: 'reminders', type: NotifiyMe }
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
