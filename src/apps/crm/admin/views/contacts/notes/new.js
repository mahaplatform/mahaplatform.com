import ProgramToken from '../../../tokens/program'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Call extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    platform: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { contact } = this.props
    const filter = {
      access_type: {
        $in: ['manage','edit']
      }
    }
    return {
      title: 'Note',
      method: 'post',
      action: `/api/admin/crm/contacts/${contact.id}/notes`,
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Program', name: 'program_id', type: 'lookup', endpoint: '/api/admin/crm/programs', filter, value: 'id', text: 'title', required: true, format: ProgramToken },
            { label: 'Note', name: 'text', type: 'textarea', placeholder: 'Leave a note', required: true },
            { label: 'Attachments', name: 'asset_ids', type: 'attachmentfield', multiple: true, prompt: 'Attach file(s)' }
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

export default Call
