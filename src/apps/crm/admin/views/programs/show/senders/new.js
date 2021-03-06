import SenderField from '@apps/crm/admin/components/senderfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    program_id: PropTypes.number
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { program_id } = this.props
    return {
      title: 'New Sender',
      method: 'post',
      action: `/api/admin/crm/programs/${program_id}/senders`,
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

  _handleSuccess(sender) {
    this.context.flash.set('success', `A confirmation email has been sent to ${sender.email}`)
    this.context.modal.close()
  }

}

export default New
