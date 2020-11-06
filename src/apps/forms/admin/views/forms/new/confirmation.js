import TemplateField from '@apps/crm/admin/components/templatefield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Confirmation extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    formdata: PropTypes.object,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onNext: PropTypes.func,
    onSave: PropTypes.func
  }

  form = null

  _handleBack = this._handleBack.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { admin } = this.context
    const { formdata } = this.props
    return {
      reference: node => this.form = node,
      showHeader: false,
      buttons: [
        { label: 'Prev', color: 'red', disabled: true, handler: this._handleCancel },
        { label: 'Save', color: 'red', handler: this._handleSubmit }
      ],
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Template', name: 'template_id', type: TemplateField, program_id: formdata.program.id },
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${formdata.program.id}/senders`, filter: { is_verified: { $eq: true } }, value: 'id', text: 'rfc822', required: true },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: admin.user.email },
            { label: 'Subject', name: 'subject', type: 'textfield', emojis: true, placeholder: 'Enter a subject', required: true, defaultValue: 'Thank you for your response' }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(confirmation) {
    this.props.onSave({ confirmation })
  }

}

export default Confirmation
