import ToField from '../../../../../campaigns/admin/components/tofield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Resend extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    workflow: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { workflow } = this.props
    return {
      title: 'Enroll Contacts',
      action: `/api/admin/automation/workflows/${workflow.id}/enroll`,
      method: 'patch',
      saveText: 'Enroll',
      onCancel: this._handleCancel,
      onChangeField: this._handleChangeField,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Contacts', name: 'to', type: ToField, program_id: workflow.program.id, channel: 'all', purpose: 'transactional' }
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

export default Resend
