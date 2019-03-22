import { CompactUserToken, Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  render() {
    return <Form { ...this._getForm() } />
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  _getForm() {
    return {
      title: 'Create Plan',
      method: 'post',
      action: '/api/admin/competencies/plans',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Supervisor', name: 'supervisor_id', type: 'lookup', required: true, endpoint: '/api/admin/competencies/supervisors', value: 'id', text: 'full_name', format: CompactUserToken },
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
    this.context.router.push(`/admin/competencies/plans/${result.id}`)
    this.context.modal.close()
  }

}

export default New
