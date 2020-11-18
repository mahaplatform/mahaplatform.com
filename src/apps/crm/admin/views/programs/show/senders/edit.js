import SenderField from '@apps/crm/admin/components/senderfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    sender: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { sender } = this.props
    return {
      title: 'Edit Sender',
      method: 'patch',
      endpoint: `/api/admin/crm/programs/${sender.program.id}/senders/${sender.id}`,
      action: `/api/admin/crm/programs/${sender.program.id}/senders/${sender.id}`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Enter the from name', required: true },
            { label: 'Email', name: 'email', type: SenderField, required: true }
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

export default Edit
