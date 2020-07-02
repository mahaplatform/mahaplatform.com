import TemplateField from '../../../../crm/admin/components/templatefield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Confirmation extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object,
    onBack: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { admin } = this.context
    const { store } = this.props
    const { program_id } = store
    const confirmaton = store.confirmaton || {}
    return {
      title: 'Confirmation Email',
      cancelIcon: 'chevron-left',
      saveText: 'Save',
      onCancel: this._handleBack,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Template', name: 'template_id', type: TemplateField, program_id },
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${program_id}/senders`, value: 'id', text: 'rfc822', required: true, defaultValue: confirmaton.sender_id },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: confirmaton.reply_to || admin.user.email},
            { label: 'Subject', name: 'subject', type: 'textfield', emojis: true, placeholder: 'Enter a subject', required: true, defaultValue: confirmaton.subject || 'Thank you for your purchase' }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }
  _handleSuccess(confirmation) {
    this.props.onDone({ confirmation })
  }

}

export default Confirmation
