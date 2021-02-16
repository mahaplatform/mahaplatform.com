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

  state = {
    data: {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
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
      onChange: this._handleChange,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${formdata.program.id}/senders`, value: 'id', text: 'rfc822', required: true },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', required: true, defaultValue: admin.user.email },
            { label: 'Email', type: 'segment', fields: [
              { label: 'Subject', name: 'subject', type: 'textfield', emojis: true, placeholder: 'Enter a subject', required: true, defaultValue: 'Thank you for your order' },
              { label: 'Template', name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'template', text: 'Create email from an existing email template' },
                { value: 'new', text: 'Create email from a blank template' }
              ], required: true, defaultValue: 'template' },
              ...this._getTemplates()
            ] }
          ]
        }
      ]
    }
  }

  _getTemplates() {
    const { data } = this.state
    const { formdata } = this.props
    if(data.strategy === 'template' ) {
      return [
        { name: 'template_id', type: TemplateField, program_id: formdata.program.id }
      ]
    }
    return [
      { name: 'body', type: 'htmlfield', placeholder: 'Enter a body', required: true, defaultValue: `
        <p><%- contact.first_name %>,</p>
        <p>&nbsp;</p>
        <p>Thank you for your order. Here is a summary:</p>
        <p>&nbsp;</p>
        <p><%- order.payment_summary %></p>
      ` }
    ]
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(data) {
    this.setState({ data })
  }

  _handleSubmit() {
    this.form.submit()
  }

  _handleSuccess(confirmation) {
    this.props.onSave({ confirmation })
  }

}

export default Confirmation
